export default ({ Db }) => {
  const client = Db.collection('bank_accounts');
  return {
    findOne: async ({ bankAccountId }) => client.findOne({ bankAccountId }),
    updateBalance: ({ bankAccountId, balance }) =>
      client.updateOne(
        {
          bankAccountId,
        },
        {
          $set: { balance },
        }
      ),
  };
};
