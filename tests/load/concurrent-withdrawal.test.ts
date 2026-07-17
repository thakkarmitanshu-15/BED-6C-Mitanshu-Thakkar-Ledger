import * as withdrawalService from "../../src/services/withdrawalService";
import dotenv from "dotenv";

dotenv.config();

beforeEach(async () => {
  const { Pool } = require("pg");

  const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  await pool.query(`
    UPDATE balance_snapshots
    SET balance = CASE
      WHEN account_id = 1 THEN 10000
      WHEN account_id = 7 THEN 0
    END
    WHERE account_id IN (1,7);
  `);

  await pool.end();
});

describe("Concurrent Withdrawal Load Test", () => {
  it("should allow only 20 successful withdrawals", async () => {
    const requests = [];

    for (let i = 0; i < 50; i++) {
      requests.push(
        withdrawalService.processWithdrawal(
          1,
          7,
          500
        )
      );
    }

    const results = await Promise.allSettled(requests);

const success = results.filter(
  (r) => r.status === "fulfilled"
).length;

const failed = results.filter(
  (r) => r.status === "rejected"
).length;

console.log({ success, failed });

expect(success).toBe(20);
expect(failed).toBe(30);
  });
});