import SQL from 'sql-template-strings';
import { compose } from '../../lib/utils.js';

export default ({ Db }) => {
  return {
    findOne: compose([Db.one, findBankAccountQuery]),
    updateBalance: compose([Db.one, updateBalanceQuery]),
  };
};

const findBankAccountQuery = ({ bankAccountId }) => SQL`
SELECT
    *
FROM
    bank_accounts
WHERE
    bank_account_id= ${bankAccountId}
`;

const updateBalanceQuery = ({ bankAccountId, balance }) => SQL`
UPDATE
    bank_accounts
SET
    balance=${balance}
WHERE
    bank_account_id=${bankAccountId}
;`;
