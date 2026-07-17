import { Pool } from "pg";
import dotenv from "dotenv";
import { withdrawal } from "./transactionHandlers/withdrawal";
import { createJournalEntry } from "./journalEntryService";
import { randomUUID } from "crypto";

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export async function processWithdrawal(
  walletAccount: number,
  depositLiability: number,
  amount: number
): Promise<boolean> {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const balanceResult = await client.query(
      `
      SELECT balance
      FROM balance_snapshots
      WHERE account_id = $1
      FOR UPDATE
      `,
      [walletAccount]
    );

    if (balanceResult.rows.length === 0) {
      throw new Error("Account balance not found.");
    }

    const balance = Number(balanceResult.rows[0].balance);

    if (balance < amount) {
      throw new Error("Insufficient balance.");
    }

    await client.query(
      `
      UPDATE balance_snapshots
      SET balance = balance - $1,
          last_updated = CURRENT_TIMESTAMP
      WHERE account_id = $2
      `,
      [amount, walletAccount]
    );

    const transactionId = randomUUID();

    await client.query(
      `
      INSERT INTO transactions (
        id,
        transaction_type,
        amount,
        currency
      )
      VALUES ($1, $2, $3, $4)
      `,
      [
        transactionId,
        2,
        amount,
        "INR",
      ]
    );

    const entries = withdrawal(
      walletAccount,
      depositLiability,
      amount
    );

    await createJournalEntry(client, transactionId, entries);

    await client.query("COMMIT");

    return true;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}