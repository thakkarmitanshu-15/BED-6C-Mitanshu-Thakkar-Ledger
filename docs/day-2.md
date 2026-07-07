# Day 2 - Ledger Entry Schema & Hash Chain

## Objectives

- Designed ledger_entries table.
- Implemented SHA-256 hash utility.
- Added database constraints.
- Implemented immutable ledger entries.
- Added idempotency key enforcement.
- Created unit tests.
- Documented duplicate processing incident.

## Files Created

migrations/002_create_ledger_entries_table.sql

migrations/003_create_immutability_triggers.sql

src/utils/hash.ts

tests/unit/hash.test.ts

docs/incident-responses/incident-002-duplicate-processing.md

## Features

### Constraints

- amount > 0
- UNIQUE(idempotency_key)
- NOT NULL audit fields

### Hash Chain

- SHA-256 implementation.
- Previous hash linked to current hash.

### Immutability

- UPDATE prevented.
- DELETE prevented.

## Outcome

Ledger entries became immutable and tamper-resistant.