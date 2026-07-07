CREATE TABLE balance_snapshots (

    account_id INTEGER PRIMARY KEY
        REFERENCES accounts(id),

    balance NUMERIC(18,2) NOT NULL DEFAULT 0,

    currency CHAR(3) NOT NULL,

    last_updated TIMESTAMP
        DEFAULT CURRENT_TIMESTAMP

);