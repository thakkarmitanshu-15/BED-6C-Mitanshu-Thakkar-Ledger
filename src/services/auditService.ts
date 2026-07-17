import { Pool } from "pg";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export async function verifyHashChain(
  fromDate?: string,
  toDate?: string
) {
  const client = await pool.connect();

  try {
    let query = `
      SELECT *
      FROM ledger_entries
    `;

    const params: unknown[] = [];

    if (fromDate && toDate) {
      query += `
        WHERE created_at BETWEEN $1 AND $2
      `;
      params.push(fromDate, toDate);
    }

    query += `
      ORDER BY created_at ASC
    `;

    const result = await client.query(query, params);

    const entries = result.rows;

    if (entries.length === 0) {
      return {
        valid: true,
        message: "No ledger entries found.",
      };
    }

    for (let i = 1; i < entries.length; i++) {
      const previous = entries[i - 1];
      const current = entries[i];

      const expectedHash = crypto
        .createHash("sha256")
        .update(
          previous.current_hash +
            current.account_id +
            current.entry_type +
            current.amount +
            current.currency
        )
        .digest("hex");

      if (expectedHash !== current.current_hash) {
        return {
          valid: false,
          brokenAt: current.id,
          expected: expectedHash,
          actual: current.current_hash,
        };
      }
    }

    return {
      valid: true,
      entriesVerified: entries.length,
    };
  } finally {
    client.release();
  }
}

export async function detectAnomalies() {
  const client = await pool.connect();

  try {
    const result = await client.query(`
      SELECT
        id,
        account_id,
        amount,
        entry_type,
        created_at
      FROM ledger_entries
      WHERE
            amount % 1000 = 0
         OR EXTRACT(HOUR FROM created_at) < 6
         OR EXTRACT(HOUR FROM created_at) > 22
      ORDER BY created_at DESC
    `);

    return result.rows;
  } finally {
    client.release();
  }
}