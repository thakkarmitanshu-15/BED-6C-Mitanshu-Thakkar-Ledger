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

export async function getExchangeRate(
  baseCurrency: string,
  targetCurrency: string
) {
  const result = await pool.query(
    `
    SELECT *
    FROM exchange_rate_snapshots
    WHERE base_currency=$1
    AND target_currency=$2
    ORDER BY created_at DESC
    LIMIT 1
    `,
    [baseCurrency, targetCurrency]
  );

  if (result.rows.length === 0) {
    throw new Error("Exchange rate not found.");
  }

  const rate = result.rows[0];

  if (new Date(rate.valid_until) < new Date()) {
    throw new Error("Exchange rate has expired.");
  }

  return rate;
}