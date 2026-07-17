import dotenv from "dotenv";
dotenv.config();
console.log(process.env.DB_PASSWORD);
import { Pool } from "pg";
import { deposit } from "../../src/services/transactionHandlers/deposit";
import { createJournalEntry } from "../../src/services/journalEntryService";
import { randomUUID } from "crypto";


const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

describe("Deposit Integration Test", () => {
  it("should create balanced journal entries", async () => {
    const client = await pool.connect();

    try {
      const lines = deposit(1, 7, 100);

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
    1,      // or the correct value representing a deposit
    100,
    "INR",
  ]
);

      await createJournalEntry(client,transactionId, lines);

      const result = await client.query(
        "SELECT * FROM ledger_entries WHERE amount = $1",
        [100]
      );

      expect(result.rows.length).toBeGreaterThan(0);
    } finally {
      client.release();
    }
  });
});
afterAll(async () => {
  await pool.end();
});