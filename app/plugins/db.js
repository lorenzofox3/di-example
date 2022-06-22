import plugin from 'fastify-plugin';
import { createDBClient } from '../../lib/db/index.js';

export const dbConnection = plugin(
  async (instance, config) => {
    const pool = createDBClient(config);
    // ping to validate the connection
    await pool.query('SELECT now()').catch((err) => {
      instance.log.info('could not initiate the connection with the database');
      instance.log.error({ err });
      throw err;
    });

    instance.decorate('db', pool);
    instance.addHook('onClose', async () => {
      pool.end();
    });
  },
  {
    name: 'db-connection',
  }
);
