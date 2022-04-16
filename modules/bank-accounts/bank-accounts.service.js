import SQL from 'sql-template-strings';
import {compose} from '../../lib/utils.js';

export default ({db}) => ({
    findOne: compose([db.one, findBankAccountQuery]),
    updateBalance: compose([db.one, updateBalanceQuery])
})

const findBankAccountQuery = ({ bankAccountId }) => SQL`
SELECT
    *
FROM
    bank_accounts
WHERE
    bank_account_id= ${bankAccountId}
`;

const updateBalanceQuery = ({bankAccountId, balance}) => SQL`
UPDATE
    bank_accounts
SET
    balance=${balance}
WHERE
    bank_account_id=${bankAccountId}
RETURNING
    *
`
