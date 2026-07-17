# Day 12 – Financial Reporting

## Objective

Implemented financial reporting capabilities for the ledger.

## Features

- Account Statement API
- Trial Balance
- Balance Sheet
- Income Statement
- CSV Export
- Reporting Integration Tests

## Files Added

- src/services/reportService.ts
- src/routes/reportRoutes.ts
- src/utils/csvExporter.ts
- tests/integration/reporting.test.ts

## API Endpoints

GET /api/v1/reports/statement/:accountId

GET /api/v1/reports/trial-balance

GET /api/v1/reports/trial-balance/export

GET /api/v1/reports/balance-sheet

GET /api/v1/reports/income-statement

## Outcome

Implemented reporting APIs and CSV export for ledger data.