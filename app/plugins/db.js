import plugin from 'fastify-plugin';
import {createConnectionPool} from '../../lib/db/pool.js';

export const dbConnection = plugin(
    async (instance, config) => {
        const pool = createConnectionPool(config.pg);
        // ping to validate the connection
        await pool.query('SELECT now()').catch((err) => {
            instance.log.info('could not initiate the connection with the database');
            instance.log.error({ err });
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
