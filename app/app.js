import fastify from 'fastify';
import sensible from 'fastify-sensible';
import { createAPI } from './api/index.js';

export const createApp = (options) => {
  const app = fastify({
    logger: true,
  });
  app.register(sensible);
  app.register(createAPI, options);
  return app;
};
