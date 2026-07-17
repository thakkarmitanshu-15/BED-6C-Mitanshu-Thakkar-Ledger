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

async function archiveOldEntries() {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await client.query(`
      CREATE TABLE IF NOT EXISTS ledger_entries_archive
      (LIKE ledger_entries INCLUDING ALL);
    `);

    await client.query(`
      INSERT INTO ledger_entries_archive
      SELECT *
      FROM ledger_entries
      WHERE created_at < NOW() - INTERVAL '1 year';
    `);

    await client.query(`
      DELETE FROM ledger_entries
      WHERE created_at < NOW() - INTERVAL '1 year';
    `);

    await client.query("COMMIT");

    console.log("Ledger archival completed.");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

archiveOldEntries().catch(console.error);