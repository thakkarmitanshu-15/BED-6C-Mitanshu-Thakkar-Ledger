import { Pool } from "pg";
import dotenv from "dotenv";
import { verifyHashChain } from "../../src/services/auditService";

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

describe("Audit Trail Verification", () => {
  afterAll(async () => {
    await pool.end();
  });

  it("should verify a valid hash chain", async () => {
    const result = await verifyHashChain();

    expect(result.valid).toBe(true);
  });

 it("should prevent ledger entry tampering", async () => {
  const client = await pool.connect();

  try {
    const { rows } = await client.query(`
      SELECT id
      FROM ledger_entries
      ORDER BY created_at ASC
      LIMIT 1
    `);

    if (rows.length === 0) {
      return;
    }

    await expect(
      client.query(
        `
        UPDATE ledger_entries
        SET current_hash = 'tampered_hash'
        WHERE id = $1
        `,
        [rows[0].id]
      )
    ).rejects.toThrow("Ledger entries cannot be updated or deleted.");
  } finally {
    client.release();
  }
});
});