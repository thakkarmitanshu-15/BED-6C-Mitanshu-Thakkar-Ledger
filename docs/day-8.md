# Day 8 – Reversals & Refund Engine

## Objectives

The objective of Day 8 was to implement a secure and auditable reversal and refund system while maintaining the immutable nature of the ledger. The implementation follows the no-mutation principle by creating reversing journal entries instead of modifying existing ledger records.

---

## Features Implemented

### 1. Transaction Tracking

- Added a `transactions` table to maintain business transaction information.
- Linked ledger entries with their corresponding transaction using `transaction_id`.
- Preserved complete auditability of every business transaction.

---

### 2. Full Reversal Engine

- Implemented support for full transaction reversal.
- Reversal creates new journal entries that mirror the original transaction.
- Original ledger entries remain unchanged.

---

### 3. Partial Refund Support

- Added support for partial refunds.
- Refund amount is validated before processing.
- Multiple partial refunds are supported until the original transaction amount is reached.

---

### 4. Refund Validation

Implemented anti-fraud validation:

- Total refunded amount can never exceed the original transaction amount.
- Invalid refund requests are rejected before journal creation.

---

### 5. Concurrency Protection

To prevent duplicate refunds:

- Original transaction is locked using PostgreSQL `SELECT ... FOR UPDATE`.
- Concurrent refund requests are serialized.
- Only one refund transaction can update the refunded amount at a time.

---

### 6. Immutable Ledger

The implementation follows double-entry accounting principles:

- Original journal entries are never updated.
- Refunds and reversals generate completely new journal entries.
- Every accounting operation remains traceable.

---

## Database Changes

Created:

- `transactions` table

Added:

- `transaction_id` column to `ledger_entries`

This allows every journal entry to be associated with its originating business transaction.

---

## Testing

The following scenarios were verified:

- Full transaction reversal
- Partial refund
- Refund amount validation
- Prevention of over-refunding
- Concurrent refund protection

---

## Incident Response

Addressed Incident Card Day 8:

**Refund vs Credit Separation**

Refunds are recorded as independent accounting transactions rather than credits applied directly to customer balances. This preserves ledger integrity, simplifies auditing, and maintains a complete financial history.

---

## Outcome

The refund and reversal engine provides:

- Immutable accounting records
- Complete audit trail
- Fraud prevention
- Concurrent refund protection
- Double-entry compliance

The implementation forms the foundation for chargebacks, dispute handling, and advanced financial transaction workflows in later phases.