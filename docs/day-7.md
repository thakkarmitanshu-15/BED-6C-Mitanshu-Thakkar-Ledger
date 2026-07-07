# Day 7 - Concurrency Control & Double-Spend Prevention

## Objectives

- Implemented concurrency control.
- Added row-level locking.
- Created concurrent withdrawal load test.
- Created concurrent P2P transfer load test.
- Documented concurrency strategy.
- Updated README.

---

## Files Created

### Services

- src/services/concurrencyControl.ts

### Load Tests

- tests/load/concurrent-withdrawal.test.ts
- tests/load/concurrent-p2p.test.ts

### Documentation

- docs/architecture/ADR-002.md
- docs/day-7.md

---

## Concurrency Strategy

Implemented:

- PostgreSQL `SELECT ... FOR UPDATE`
- Ordered locking for multiple accounts

---

## Load Testing

### Concurrent Withdrawals

- Simulated 50 concurrent requests.
- Verified controlled execution.

### Concurrent P2P Transfers

- Simulated 20 concurrent transfers.
- Verified no deadlocks.

---

## Outcome

Implemented database-level locking and load-testing framework to support concurrent transaction processing while preventing race conditions and double spending.