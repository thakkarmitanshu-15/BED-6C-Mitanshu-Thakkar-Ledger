# Incident 008 – Refund vs Credit Separation

## Incident

A proposal suggested processing refunds by directly crediting customer balances without creating a separate accounting transaction.

## Risk

Direct balance updates would:

- Break ledger immutability.
- Remove the audit trail.
- Make reconciliation difficult.
- Violate double-entry accounting principles.

## Resolution

Refunds are implemented as independent transactions.

Every refund:

- Creates a new transaction record.
- Generates a new balanced journal entry.
- References the original transaction.
- Updates refunded amount after validation.

The original journal entries remain unchanged.

## Result

- Complete audit trail maintained.
- Ledger remains immutable.
- Supports partial refunds.
- Prevents over-refunding.
- Enables concurrent refund protection.