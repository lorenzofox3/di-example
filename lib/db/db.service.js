import { createConnectionPool as createPGClient } from './sqlImpl/pg/pool.js';
import { createConnectionPool as createMYSQLClient } from './sqlImpl/mysql/pool.js';
import { createConnectionPool as createMongoClient } from './mongoImpl/pool.js';
import { bindToInjectables } from './utils.js';
import { compose } from '../utils.js';
import { singleton } from '../di/injector.js';

const dbClientFactory = ({ conf, signal }) => {
  const { engine = 'pg', pg, mysql, mongo } = conf;
  switch (engine) {
    case 'mongo':
      return createMongoClient({ ...mongo, signal });
    case 'mysql':
      return createMYSQLClient({ ...mysql, signal });
    default:
      return createPGClient({ ...pg, signal });
  }
};

const wrap = compose([singleton, bindToInjectables]);

export default wrap(dbClientFactory);
