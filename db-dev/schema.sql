BEGIN;
DROP TABLE IF EXISTS bank_accounts;

CREATE TABLE bank_accounts(
    bank_account_id INTEGER PRIMARY KEY,
    balance INTEGER CHECK (balance >= 0)
);

INSERT INTO bank_accounts(bank_account_id, balance) VALUES
(1, 100),
(2, 100);
COMMIT;
