# Day 3 - Journal Entry Processing Engine

## Objectives

- Implemented journal entry processing.
- Added balance validation.
- Created transaction handlers.
- Added PostgreSQL transactions.
- Implemented request validation.
- Created unit and integration tests.

## Files Created

src/services/journalEntryService.ts

src/services/transactionHandlers/deposit.ts

src/services/transactionHandlers/withdrawal.ts

src/services/transactionHandlers/p2pTransfer.ts

src/services/transactionHandlers/feeDeduction.ts

src/validators/journalEntry.validator.ts

tests/unit/journalEntryService.test.ts

tests/integration/deposit.test.ts

tests/integration/withdrawal.test.ts

tests/integration/p2pTransfer.test.ts

## Features

### Supported Transactions

- Deposit
- Withdrawal
- P2P Transfer
- Fee Deduction

### Validation

- Debit total must equal credit total.
- Invalid journal entries rejected.

### Database Transactions

- BEGIN
- COMMIT
- ROLLBACK

### Testing

- Unit tests for balance validation.
- Integration tests for transaction handlers.

## Outcome

Implemented a transactional double-entry journal engine ensuring atomicity and accounting correctness.