import fastify from 'fastify';
import sensible from 'fastify-sensible';
import {dbConnection} from './plugins/db.js';
import {createAPI} from './api/index.js';

export const createApp = (options) => {
    const app = fastify({
        logger: true
    });
    app.register(sensible);
    app.register(dbConnection, options);
    app.register(createAPI, options);
    return app;
};
