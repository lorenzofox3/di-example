import assert from 'node:assert';

export const credit = ({account, amount}) => ({
    ...account,
    balance: assert.ok(amount > 0, 'amount must be positive') || (account.balance + amount)
});

export const debit = ({account, amount}) => ({
    ...account,
    balance: assert.ok(amount > 0, 'amount must be positive') || (account.balance - amount)
});

export const transfert = ({from, to, amount}) => ({
    from: debit({account: from, amount}),
    to: credit({account: to, amount})
});
