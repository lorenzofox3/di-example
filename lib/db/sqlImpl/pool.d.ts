import { SQLStatement } from 'sql-template-strings';
import { ITransactionManager } from '../db.service.js';

export interface ISQLClient {
  query<Row>(statement: SQLStatement): Promise<Array<Row>>;
  one<Row>(statement: SQLStatement): Promise<Row>;
}

export interface ISQLPool extends ITransactionManager<ISQLClient> {}
