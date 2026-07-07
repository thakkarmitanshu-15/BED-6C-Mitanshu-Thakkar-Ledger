# Day 4 - Trial Balance & Balance Derivation

## Objectives

- Implemented trial balance generation service.
- Implemented account balance derivation based on account type.
- Created materialized balance snapshot table.
- Implemented Trial Balance API endpoint with optional date filtering.
- Added automatic balance snapshot updates after journal entries.
- Created integration test for the Trial Balance service.
- Documented trial balance discrepancy incident.

---

## Files Created

### Database

- migrations/004_create_balance_snapshots_table.sql

### Services

- src/services/balanceService.ts
- src/services/trialBalanceService.ts

### Controllers

- src/controllers/trialBalanceController.ts

### Routes

- src/routes/trialBalance.ts

### Tests

- tests/integration/trialBalance.test.ts

### Documentation

- docs/incident-responses/incident-004-trial-balance-discrepancy.md

---

## Features Implemented

### Trial Balance Generation

- Calculates total debits for every account.
- Calculates total credits for every account.
- Groups results by account.
- Supports optional date filtering.

---

### Balance Derivation

Balance calculation is based on account type.

| Account Type | Formula |
|--------------|----------|
| Asset | Debits − Credits |
| Expense | Debits − Credits |
| Liability | Credits − Debits |
| Equity | Credits − Debits |
| Revenue | Credits − Debits |

---

### Balance Snapshot

Created a `balance_snapshots` table that stores:

- Account ID
- Current Balance
- Currency
- Last Updated Timestamp

Snapshots are automatically updated after every successful journal entry.

---

### API Endpoint

**GET**

```
/api/v1/trial-balance
```

Optional query parameter:

```
?date=YYYY-MM-DD
```

Example:

```
GET /api/v1/trial-balance
```

```
GET /api/v1/trial-balance?date=2026-07-07
```

---

### Integration Testing

Implemented integration tests to verify:

- Trial Balance service executes successfully.
- Trial Balance report is generated.
- API returns expected response structure.

---

## Incident Response

Documented:

- Root cause analysis
- Resolution strategy
- Preventive measures

Location:

```
docs/incident-responses/incident-004-trial-balance-discrepancy.md
```

---

## Outcome

Successfully implemented:

- Trial Balance generation
- Balance derivation logic
- Balance snapshot caching
- Trial Balance REST API
- Integration testing
- Incident documentation

The system now supports generating balanced accounting reports while maintaining cached account balances for improved performance.