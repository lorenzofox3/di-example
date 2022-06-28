import createBankAccountMongo from './bank-accounts-mongo-impl.js';
import createBankAccountSql from './bank-accounts-sql-impl.js';

export default ({ conf, Db }) => {
  const { engine } = conf;
  return engine === 'mongo'
    ? createBankAccountMongo({ Db })
    : createBankAccountSql({ Db });
};
