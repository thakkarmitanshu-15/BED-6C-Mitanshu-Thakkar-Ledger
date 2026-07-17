import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export async function getAccountStatement(
  accountId: number,
  fromDate?: string,
  toDate?: string
) {
  const client = await pool.connect();

  try {
    let query = `
      SELECT
        id,
        transaction_id,
        entry_type,
        amount,
        currency,
        created_at
      FROM ledger_entries
      WHERE account_id = $1
    `;

    const params: unknown[] = [accountId];

    if (fromDate && toDate) {
      query += ` AND created_at BETWEEN $2 AND $3`;
      params.push(fromDate, toDate);
    }

    query += ` ORDER BY created_at ASC`;

    const result = await client.query(query, params);

    return result.rows;
  } finally {
    client.release();
  }
}

export async function getTrialBalance() {
  const client = await pool.connect();

  try {
    const result = await client.query(`
      SELECT
        account_id,
        SUM(
          CASE
            WHEN entry_type = 'DEBIT' THEN amount
            ELSE 0
          END
        ) AS total_debits,
        SUM(
          CASE
            WHEN entry_type = 'CREDIT' THEN amount
            ELSE 0
          END
        ) AS total_credits,
        SUM(
          CASE
            WHEN entry_type = 'DEBIT' THEN amount
            ELSE -amount
          END
        ) AS balance
      FROM ledger_entries
      GROUP BY account_id
      ORDER BY account_id;
    `);

    return result.rows;
  } finally {
    client.release();
  }
}

export async function getBalanceSheet() {
  const client = await pool.connect();

  try {
    const result = await client.query(`
      SELECT
        account_type,
        SUM(
          CASE
            WHEN entry_type = 'DEBIT' THEN amount
            ELSE -amount
          END
        ) AS balance
      FROM ledger_entries
      GROUP BY account_type
      ORDER BY account_type;
    `);

    return result.rows;
  } finally {
    client.release();
  }
}
export async function getIncomeStatement() {
  const client = await pool.connect();

  try {
    const result = await client.query(`
      SELECT
        account_type,
        SUM(
          CASE
            WHEN entry_type = 'CREDIT' THEN amount
            ELSE -amount
          END
        ) AS total
      FROM ledger_entries
      WHERE account_type IN ('REVENUE', 'EXPENSE')
      GROUP BY account_type;
    `);

    return result.rows;
  } finally {
    client.release();
  }
}