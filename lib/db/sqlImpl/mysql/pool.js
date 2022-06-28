import { createPool } from 'mysql';
import { createClient } from './client.js';

export const createConnectionPool = ({ signal, ...conf }) => {
  const pool = createPool(conf);

  signal.addEventListener(
    'abort',
    () => {
      pool.end();
    },
    { once: true }
  );

  return {
    ...createClient({ client: pool }),
    async withinTransaction(fn) {
      const client = await new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
          if (err) {
            reject(err);
          } else {
            resolve(connection);
          }
        });
      });
      try {
        await client.query('BEGIN');
        const result = await fn({ client: createClient({ client }) });
        await client.query('COMMIT');
        return result;
      } catch (e) {
        await client.query('ROLLBACK');
        throw e;
      } finally {
        client.release();
      }
    },
  };
};
