import fp from 'fastify-plugin';
import { createContainer } from '../../lib/di/container.js';

export const serviceRegistry = fp(
  async (instance, { injectableGlob = '**/*.service.js' }) => {
    const getDeps = await createContainer({ injectableGlob });
    const { db } = instance;

    const services = getDeps({ db });

    for (const [token, service] of Object.entries(services)) {
      instance.decorate(token, service);
    }
  }
);
