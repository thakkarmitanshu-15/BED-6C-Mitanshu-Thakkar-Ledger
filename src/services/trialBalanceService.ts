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

export async function getTrialBalance(asOfDate?: string) {
  let query = `
    SELECT
      a.account_code,
      a.account_name,
      a.account_type,

      COALESCE(
        SUM(CASE WHEN l.entry_type = 'DEBIT' THEN l.amount ELSE 0 END),
        0
      ) AS total_debits,

      COALESCE(
        SUM(CASE WHEN l.entry_type = 'CREDIT' THEN l.amount ELSE 0 END),
        0
      ) AS total_credits

    FROM accounts a

    LEFT JOIN ledger_entries l
      ON a.id = l.account_id
  `;

  const values: any[] = [];

  if (asOfDate) {
    query += ` WHERE l.created_at <= $1`;
    values.push(asOfDate);
  }

  query += `
    GROUP BY
      a.account_code,
      a.account_name,
      a.account_type
    ORDER BY
      a.account_code;
  `;

  const result = await pool.query(query, values);

  return result.rows;
}