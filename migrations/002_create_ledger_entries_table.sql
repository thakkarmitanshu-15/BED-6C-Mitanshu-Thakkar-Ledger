CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE ledger_entries (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    journal_id UUID NOT NULL,

    account_id INTEGER NOT NULL
        REFERENCES accounts(id),

    entry_type VARCHAR(10) NOT NULL
        CHECK(entry_type IN ('DEBIT','CREDIT')),

    amount NUMERIC(18,2) NOT NULL
        CHECK(amount > 0),

    currency CHAR(3) NOT NULL,

    description TEXT,

    reference_id VARCHAR(100),

    idempotency_key UUID NOT NULL UNIQUE,

    previous_hash TEXT,

    current_hash TEXT NOT NULL,

    created_by VARCHAR(100) NOT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    status VARCHAR(20)
        DEFAULT 'POSTED'
);