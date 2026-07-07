import express from "express";
import dotenv from "dotenv";
import { pool } from "./config/db";
import trialBalanceRoutes from "./routes/trialBalance";
import { auditLogger } from "./middleware/auditLogger";


dotenv.config();

const app = express();

app.use(express.json());

app.use(auditLogger);

app.use("/api/v1",trialBalanceRoutes);


app.get("/", async (_req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      message: "Ledger API Running",
      databaseTime: result.rows[0].now,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Database connection failed",
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});