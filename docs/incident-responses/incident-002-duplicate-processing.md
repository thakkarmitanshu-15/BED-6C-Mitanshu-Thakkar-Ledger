# Incident 002 - Duplicate Processing

## Incident
A client retried the same payment request multiple times, causing duplicate ledger entries.

## Root Cause
No idempotency key validation existed before processing transactions.

## Impact
Duplicate journal entries resulted in incorrect account balances.

## Solution
Added a UNIQUE constraint on idempotency_key and validated it before processing each transaction.

## Prevention
Requests must include an idempotency key. Duplicate keys are rejected by both the application and PostgreSQL.