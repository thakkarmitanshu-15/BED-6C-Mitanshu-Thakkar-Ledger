CREATE TABLE exchange_rate_snapshots (

    id SERIAL PRIMARY KEY,

    base_currency CHAR(3) NOT NULL,

    target_currency CHAR(3) NOT NULL,

    exchange_rate NUMERIC(18,6) NOT NULL,

    valid_from TIMESTAMP NOT NULL,

    valid_until TIMESTAMP NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);