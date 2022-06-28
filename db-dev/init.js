db = new Mongo('localhost:27017').getDB('archi-example');
db.createCollection('bank_accounts', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      properties: {
        bankAccountId: {
          bsonType: 'int',
        },
        balance: {
          bsonType: 'int',
          minimum: 0,
        },
      },
      required: ['bankAccountId', 'balance'],
    },
  },
});

db.bank_accounts.insertMany([
  { bankAccountId: NumberInt(1), balance: NumberInt(100) },
  { bankAccountId: NumberInt(2), balance: NumberInt(100) },
]);
