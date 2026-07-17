import { Router } from "express";
import {
  getAccountStatement,
  getTrialBalance,
  getBalanceSheet,
  getIncomeStatement,
} from "../services/reportService";
import { convertToCSV } from "../utils/csvExporter";

const router = Router();

router.get("/statement/:accountId", async (req, res) => {
  try {
    const accountId = Number(req.params.accountId);

    const { from_date, to_date } = req.query;

    const statement = await getAccountStatement(
      accountId,
      from_date as string | undefined,
      to_date as string | undefined
    );

    res.status(200).json(statement);
  } catch (error) {
    res.status(500).json({
      message: "Failed to generate account statement.",
      error: error instanceof Error ? error.message : error,
    });
  }
});

router.get("/trial-balance", async (_req, res) => {
  try {
    const report = await getTrialBalance();

    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({
      message: "Failed to generate trial balance.",
      error: error instanceof Error ? error.message : error,
    });
  }
});

router.get("/balance-sheet", async (_req, res) => {
  try {
    const report = await getBalanceSheet();
    res.json(report);
  } catch (error) {
    res.status(500).json({
      message: "Failed to generate balance sheet.",
      error: error instanceof Error ? error.message : error,
    });
  }
});

router.get("/income-statement", async (_req, res) => {
  try {
    const report = await getIncomeStatement();
    res.json(report);
  } catch (error) {
    res.status(500).json({
      message: "Failed to generate income statement.",
      error: error instanceof Error ? error.message : error,
    });
  }
});

router.get("/trial-balance/export", async (_req, res) => {
  try {
    const report = await getTrialBalance();

    const csv = convertToCSV(report);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=trial-balance.csv"
    );

    res.send(csv);
  } catch (error) {
    res.status(500).json({
      message: "CSV export failed.",
      error: error instanceof Error ? error.message : error,
    });
  }
});

export default router;