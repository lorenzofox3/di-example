import { valueFn } from '../utils.js';

const mapValues = (mapFn) => (object) =>
  Object.fromEntries(
    Object.entries(object)
      .concat(
        Object.getOwnPropertySymbols(object).map((symb) => [symb, object[symb]])
      )
      .map(([prop, value]) => [prop, mapFn(value)])
  );

export const createInjector = (serviceFactoryMap) => {
  // (1) The injector is now wrapped within a function
  return function inject(lateDeps = {}) {
    const deps = {};
    const propertyDescriptors = mapValues(createPropertyDescriptor);

    Object.defineProperties(
      deps,
      propertyDescriptors({
        ...serviceFactoryMap,
        ...lateDeps, // (2) you can overwrite already defined factories or create late bindings
      })
    );

    return deps;

    function createPropertyDescriptor(factory) {
      const actualFactory =
        typeof factory === 'function' ? factory : valueFn(factory); // (3) Syntactic sugar
      return {
        get() {
          return actualFactory(deps);
        },
        enumerable: true,
      };
    }
  };
};
