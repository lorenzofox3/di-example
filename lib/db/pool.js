import pg from 'pg';
import { createClient } from './client.js';

export const createConnectionPool = (conf) => {
  const pool = new pg.Pool(conf);
  return {
    ...createClient({ client: pool }),
    async withinTransaction(fn) {
      const client = await pool.connect();
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
