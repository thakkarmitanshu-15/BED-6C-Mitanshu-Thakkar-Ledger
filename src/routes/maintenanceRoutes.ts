import { Router } from "express";
import { applyRetentionPolicy } from "../services/retentionService";

const router = Router();

router.post("/retention", async (req, res) => {
  try {
    const { days } = req.body;

    const result = await applyRetentionPolicy(days ?? 365);

    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: "Retention policy failed.",
      error: error instanceof Error ? error.message : error,
    });
  }
});

export default router;