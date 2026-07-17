import { Pool } from "pg";
import dotenv from "dotenv";
import { randomUUID } from "crypto";
import { createJournalEntry, LedgerLine } from "./journalEntryService";

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export async function processFullRefund(
  originalTransactionId: string,
  refundEntries: LedgerLine[],
  refundAmount: number
): Promise<boolean> {

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Lock original transaction
    const result = await client.query(
      `
      SELECT amount, refunded_amount
      FROM transactions
      WHERE id = $1
      FOR UPDATE
      `,
      [originalTransactionId]
    );

    if (result.rows.length === 0) {
      throw new Error("Original transaction not found.");
    }

    const originalAmount = Number(result.rows[0].amount);
    const refundedAmount = Number(result.rows[0].refunded_amount);

    if (refundedAmount + refundAmount > originalAmount) {
      throw new Error("Refund exceeds original transaction amount.");
    }

    await client.query(
      `
      UPDATE transactions
      SET refunded_amount = refunded_amount + $1
      WHERE id = $2
      `,
      [refundAmount, originalTransactionId]
    );

    const refundTransactionId = randomUUID();

    await client.query(
      `
      INSERT INTO transactions (
        id,
        transaction_type,
        amount,
        currency,
        parent_transaction_id
      )
      VALUES ($1,17,$2,'INR',$3)
      `,
      [
        refundTransactionId,
        refundAmount,
        originalTransactionId
      ]
    );

    await createJournalEntry(
      client,
      refundTransactionId,
      refundEntries
    );

    await client.query("COMMIT");

    return true;

  } catch (error) {

    await client.query("ROLLBACK");
    throw error;

  } finally {

    client.release();

  }
}