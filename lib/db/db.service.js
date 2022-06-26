import { createConnectionPool as createPGClient } from './pg/pool.js';
import { createConnectionPool as createMYSQLClient } from './mysql/pool.js';
import { bindToInjectables } from './utils.js';
import { compose } from '../utils.js';
import { singleton } from '../di/injector.js';

const dbClientFactory = ({ conf, signal }) => {
  const { engine = 'pg', pg, mysql } = conf;
  return engine === 'mysql'
    ? createMYSQLClient({ ...mysql, signal })
    : createPGClient({ ...pg, signal });
};

const wrap = compose([singleton, bindToInjectables]);

export default wrap(dbClientFactory);
