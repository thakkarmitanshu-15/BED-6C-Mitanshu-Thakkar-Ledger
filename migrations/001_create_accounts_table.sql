CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    account_code VARCHAR(10) UNIQUE NOT NULL,
    account_name VARCHAR(100) NOT NULL,
    account_type VARCHAR(30) NOT NULL,
    account_sub_type VARCHAR(50) NOT NULL,
    currency CHAR(3) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);