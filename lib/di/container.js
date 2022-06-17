import { resolve } from 'node:path';
import { cwd } from 'node:process';
import { pathToFileURL } from 'node:url';
import { globby } from 'globby';
import pascalCase from 'uppercamelcase';
import { createInjector } from './injector.js';

export const createContainer = async ({
  injectableGlob = '**/*.service.js',
}) => {
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
  return ({ db }) =>
    inject({
      db: withInjectables(db),
    });
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

const getKey = (path) => pascalCase(path.split('/').at(-1).split('.').at(0));
const getFactory = async (path) => {
  const filePath = resolve(cwd(), path);
  return (await import(pathToFileURL(filePath))).default;
};
