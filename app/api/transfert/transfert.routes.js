import { transfert } from '../../../modules/bank-accounts/bank-accounts.model.js';

export const transfertAPI = async (instance) => {
  const { db } = instance;

  instance.route({
    method: 'POST',
    url: '/',
    schema: {
      body: {
        type: 'object',
        properties: {
          from: { type: 'integer' },
          to: { type: 'integer' },
          amount: { type: 'integer', exclusiveMinimum: 0 },
        },
        required: ['from', 'to', 'amount'],
      },
    },
    async handler(req, res) {
      await db.withinTransaction(async ({ BankAccounts }) => {
        const [from, to] = await Promise.all([
          BankAccounts.findOne({
            bankAccountId: req.body.from,
          }),
          BankAccounts.findOne({
            bankAccountId: req.body.to,
          }),
        ]);
        instance.assert(from && to, 422);
        const { from: newFrom, to: newTo } = transfert({
          from,
          to,
          amount: req.body.amount,
        });
        await BankAccounts.updateBalance(newTo);
        await BankAccounts.updateBalance(newFrom);
      });

      res.status(201);
    },
  });
};
