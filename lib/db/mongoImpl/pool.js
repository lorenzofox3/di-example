import { MongoClient } from 'mongodb';
import { composeP } from '../../utils.js';

export const createConnectionPool = ({ signal, ...conf }) => {
  let db;
  const { connectionURI, dbName } = conf;
  const client = new MongoClient(connectionURI);
  signal.addEventListener(
    'abort',
    () => {
      client.close();
    },
    { once: true }
  );

  return {
    collection(name, opts) {
      return createCollectionClient(name, { client });
    },
    async withinTransaction(fn) {
      let transactionResult;
      await getDb();
      await client.withSession(async (session) => {
        await session.withTransaction(async (session) => {
          const sessionBoundClient = {
            collection(collection, opts = {}) {
              return createCollectionClient(collection, {
                ...opts,
                session,
              });
            },
            withinTransaction(fn) {
              return fn({ client });
            },
          };
          transactionResult = await fn({
            client: sessionBoundClient,
          });
        });
      });
      return transactionResult;
    },
  };

  function createCollectionClient(collection, opts = {}) {
    const { session } = opts;
    const getClient = composeP([(db) => db.collection(collection), getDb]);

    return {
      async findOne(filter, opts) {
        const passedOpts = opts || {};
        return getClient().then((client) =>
          client.findOne(filter, {
            session,
            ...passedOpts,
          })
        );
      },
      async updateOne(filter, update, opts) {
        const passedOpts = opts || {};
        return getClient().then((client) =>
          client.updateOne(filter, update, {
            session,
            ...passedOpts,
          })
        );
      },
    };
  }

  async function getDb() {
    if (db) {
      return db;
    }
    console.log('connecting');
    await client.connect();
    console.log('connected');

    return (db = client.db(dbName));
  }
};
