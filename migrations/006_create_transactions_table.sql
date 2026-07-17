CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    transaction_type INTEGER NOT NULL,

    amount NUMERIC(18,2) NOT NULL
        CHECK (amount > 0),

    currency CHAR(3) NOT NULL,

    refunded_amount NUMERIC(18,2) NOT NULL DEFAULT 0
        CHECK (refunded_amount >= 0),

    status VARCHAR(20) NOT NULL DEFAULT 'COMPLETED',

    parent_transaction_id UUID
        REFERENCES transactions(id),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);