import { randomUUID } from "crypto";
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

async function generateTransactions(count = 1000) {
  const client = await pool.connect();

  try {
    for (let i = 0; i < count; i++) {
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
          randomUUID(),
          "LOAD_TEST",
          Math.floor(Math.random() * 10000) + 1,
          "INR",
        ]
      );
    }

    console.log(`${count} transactions generated.`);
  } finally {
    client.release();
    await pool.end();
  }
}

generateTransactions().catch(console.error);