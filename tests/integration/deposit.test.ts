import dotenv from "dotenv";
dotenv.config();
console.log(process.env.DB_PASSWORD);
import { Pool } from "pg";
import { deposit } from "../../src/services/transactionHandlers/deposit";
import { createJournalEntry } from "../../src/services/journalEntryService";

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

      await createJournalEntry(client, lines);

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