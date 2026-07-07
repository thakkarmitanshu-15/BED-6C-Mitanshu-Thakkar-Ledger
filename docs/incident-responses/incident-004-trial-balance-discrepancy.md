# Incident 004 - Trial Balance Discrepancy

## Incident
A mismatch was detected between total debits and total credits during trial balance generation.

## Root Cause
Some journal entries were incomplete due to interrupted transaction processing.

## Impact
Financial reports became temporarily inconsistent.

## Resolution
All journal entries are executed within PostgreSQL transactions using BEGIN, COMMIT, and ROLLBACK. Balance snapshots are refreshed after every successful journal entry.

## Prevention
- Enforce balanced journal entries.
- Update balance snapshots after each successful transaction.
- Periodically reconcile the trial balance to ensure total debits equal total credits.