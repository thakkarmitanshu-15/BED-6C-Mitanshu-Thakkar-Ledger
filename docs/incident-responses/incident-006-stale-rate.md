# Incident 006 - Stale Exchange Rate

## Incident

A foreign exchange transaction was processed using an expired exchange rate.

## Root Cause

The application selected an outdated exchange rate that had exceeded its validity period.

## Impact

Incorrect conversion amounts and inaccurate financial reporting.

## Resolution

The exchange rate service validates the `valid_until` timestamp before allowing any conversion. Transactions using expired rates are rejected.

## Prevention

- Validate rate validity before conversion.
- Maintain periodic exchange rate updates.
- Log rejected transactions for audit purposes.