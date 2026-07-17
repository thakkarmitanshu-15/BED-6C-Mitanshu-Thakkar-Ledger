import fs from "fs";
import path from "path";
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

async function run() {
  const client = await pool.connect();

  try {
    const migrationDir = path.join(__dirname, "../migrations");

    const files = fs
      .readdirSync(migrationDir)
      .filter(file => file.endsWith(".sql"))
      .sort();

    for (const file of files) {
      const sql = fs.readFileSync(
        path.join(migrationDir, file),
        "utf8"
      );

      console.log(`Running ${file}...`);

      await client.query(sql);
    }

    console.log("All migrations completed.");
  } finally {
    client.release();
    await pool.end();
  }
}

run().catch(console.error);