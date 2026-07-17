import { Router } from "express";
import {
  verifyHashChain,
  detectAnomalies,
} from "../services/auditService";

const router = Router();

router.get("/verify", async (_req, res) => {
  try {
    const result = await verifyHashChain();

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Audit verification failed.",
      error: error instanceof Error ? error.message : error,
    });
  }
});

router.get("/anomalies", async (_req, res) => {
  try {
    const result = await detectAnomalies();

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Anomaly detection failed.",
      error: error instanceof Error ? error.message : error,
    });
  }
});

export default router;