import { valueFn } from '../utils.js';

export const bindToInjectables = (factory) => (injectables) => {
  const Db = factory(injectables);
  return {
    ...Db,
    withinTransaction: (fn) => {
      return Db.withinTransaction(({ client }) => {
        return fn(
          injectables.inject({
            Db: bindToInjectables(valueFn(client)),
          })
        );
      });
    },
  };
};
