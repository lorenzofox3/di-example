import fp from 'fastify-plugin';
import { createContainer } from '../../lib/di/container.js';

export const serviceRegistry = fp(async (instance, opts) => {
  const { injectableGlob = '**/*.service.js', ...conf } = opts;
  const abortController = new AbortController();
  const { signal } = abortController;
  const getInjectables = await createContainer({ injectableGlob });
  instance.addHook('onClose', async (instance) => {
    abortController.abort();
  });
  const services = getInjectables({ conf, signal });
  for (const [token, service] of Object.entries(services)) {
    instance.decorate(token, service);
  }
});
