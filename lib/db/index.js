import { createConnectionPool as createPGClient } from './pg/pool.js';
import { createConnectionPool as createMYSQLClient } from './mysql/pool.js';

export const createDBClient = ({ engine = 'pg', pg, mysql }) =>
  engine === 'mysql' ? createMYSQLClient(mysql) : createPGClient(pg);
