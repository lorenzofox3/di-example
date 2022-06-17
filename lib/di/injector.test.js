import { test } from 'zora';
import { createInjector } from './injector.js';

const defaultUser = { name: 'John' };

const inject = createInjector({
  Greeter: ({ user }) => ({
    greet() {
      return `Hello ${user.name}`;
    },
  }),
  user: defaultUser,
});

test(`Use default service instances as provided by the manifest`, (t) => {
  const { Greeter } = inject();
  t.eq(Greeter.greet(), 'Hello John');

  t.ok(
    Greeter !== inject().Greeter,
    'should return a different instance on every invocation'
  );
});

test(`Overwrite dependencies at invocation time`, (t) => {
  t.eq(inject().Greeter.greet(), 'Hello John');
  t.eq(
    inject({
      user: {
        name: 'Bob',
      },
    }).Greeter.greet(),
    'Hello Bob'
  );
  t.eq(
    inject({
      user: {
        name: 'Raymond',
      },
    }).Greeter.greet(),
    'Hello Raymond'
  );
});

test(`Use symbol for tokens`, (t) => {
  const sym = Symbol('foo');
  const manifest = {
    [sym]: 'foo',
    canAccessSymbol: ({ [sym]: foo }) => foo,
    cantAccessSymbol: ({
      [Symbol('foo') /* trying to lookup for the symbol */]: foo,
    }) => foo,
  };
  const { canAccessSymbol, cantAccessSymbol } = createInjector(manifest)();
  t.eq(canAccessSymbol, 'foo');
  t.eq(cantAccessSymbol, undefined, 'could not resolve the symbol');
});
