export const compose = (fns) => (arg) => fns.reduceRight((x, f) => f(x), arg);
export const composeP = (fns) => (arg) =>
  fns.reduceRight((x, f) => x.then(f), Promise.resolve(arg));
export const head = (array) => array.at(0);
export const map = (fn) => (functor) => functor.map(fn);
export const mapKeys = (fn) => (target) =>
  Object.fromEntries(
    Object.entries(target).map(([key, val]) => [fn(key), val])
  );
export const valueFn = (val) => () => val;
