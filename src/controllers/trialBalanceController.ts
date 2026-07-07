import { Request, Response } from "express";
import { getTrialBalance } from "../services/trialBalanceService";

export async function trialBalance(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { date } = req.query;

    const report = await getTrialBalance(
      date ? String(date) : undefined
    );

    res.status(200).json({
      success: true,
      data: report,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to generate trial balance.",
    });
  }
}