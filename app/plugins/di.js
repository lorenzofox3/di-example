import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import fp from 'fastify-plugin';
import { globby } from 'globby';
import pascalCase from 'uppercamelcase';
import { createInjector } from '../../lib/di/injector.js';

export const serviceRegistry = fp(
  async (instance, { injectableGlob = '**/*.service.js' }) => {
    const { db } = instance;
    const servicesFiles = await globby([injectableGlob]);
    const inject = createInjector(
      Object.fromEntries(
        await Promise.all(
          servicesFiles.map((path) =>
            Promise.all([getKey(path), getFactory(path)])
          )
        )
      )
    );

    const services = inject({
      db: withInjectables(db),
    });

    for (const [token, service] of Object.entries(services)) {
      instance.decorate(token, service);
    }
  }
);

const getKey = (path) => pascalCase(path.split('/').at(-1).split('.').at(0));
const getFactory = async (path) => {
  const filePath = resolve(process.cwd(), path);
  return (await import(pathToFileURL(filePath))).default;
};
const withInjectables =
  (db) =>
  ({ inject }) => ({
    ...db,
    withinTransaction: (fn) =>
      db.withinTransaction(({ client: db }) =>
        fn(
          inject({
            db: withInjectables(db),
          })
        )
      ),
  });
