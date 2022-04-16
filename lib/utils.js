export const compose = (fns) => (args) => fns.reduceRight((x, f) => f(x), args);

export const composeP = (fns) => (args) =>
  fns.reduceRight((x, f) => x.then(f), Promise.resolve(args));

export const map = (fn) => (functor) => functor.map(fn);

export const mapEntries = (fn) => (target) =>
  Object.fromEntries(Object.entries(target).map(fn));

export const mapKeys = (fn) => mapEntries(([key, value]) => [fn(key), value]);

export const mapValues = (fn) => mapEntries(([key, value]) => [key, fn(value)]);

export const head = (array) => array.at(0);

export const valueFn = (value) => () => value;
