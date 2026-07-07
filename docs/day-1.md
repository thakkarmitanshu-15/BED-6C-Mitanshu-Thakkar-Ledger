# Day 1 - Repository Setup, Environment & Chart of Accounts

## Objectives
- Initialized GitHub repository.
- Configured Node.js with TypeScript.
- Set up Docker Compose with PostgreSQL 15.
- Created the Chart of Accounts schema.
- Added database migration for accounts.
- Seeded the database with 19 Chart of Accounts.
- Created ADR-001 for technology selection.

## Files Created

README.md

Dockerfile

docker-compose.yml

.env.example

migrations/001_create_accounts_table.sql

seeds/chart_of_accounts.sql

docs/architecture/ADR-001.md

## Database

Created `accounts` table with:

- account_code
- account_name
- account_type
- account_sub_type
- currency
- created_at

Seeded 19 accounts.

## Technologies

- Node.js
- TypeScript
- Express
- PostgreSQL
- Docker

## Outcome

- PostgreSQL container running.
- Application connected successfully.
- Chart of Accounts created.
- Seed data inserted successfully.