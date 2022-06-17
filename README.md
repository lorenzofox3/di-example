# Dependency Injection example

This is the application of the [following article]()

It uses the DI container defined in the article. An injectable (service) registers itself to the manifest using a convention:
any file with the ``.service.js`` extension will be injectable. For example a file called ``bank-account.service.js`` will be injectable under the token ``BankAccount``.  

The DI container is used in the context of a web server (built with the [Fastify framework](https://www.fastify.io/)) with one route which simulates a money transfert between two accounts. Once you have started the server you can run the following curl command:

```shell
curl -X POST --location "http://localhost:3005/transferts/" \
-H "Content-Type: application/json" \
-d "{
\"from\": 1,
\"to\": 2,
\"amount\": 30
}"
```

This will move 30(euros) from bank account 1 to bank account 2. 
The action is done within a SQL transaction, and there is a constraint over the balance column: if the balance of the debited account get lower than zero the transaction is aborted.

The DI container does not have to be used with any particular framework. To show the point there is a script which uses the DI container and let you check the balance of any bank account. For example, you can run: 

``npm run script -- 1 2``

and you will see the balance for account 1 and account 2

## Getting started

### database

You can start un local dev database with docker-compose:

``docker-compose up -d db``

This will start a postgres container with the schema already set and a data seed (two bank accounts with an initial balance of 100 euros)

### server

simply run ``npm dev``

You should now be able to send request with the aforementioned curl command
