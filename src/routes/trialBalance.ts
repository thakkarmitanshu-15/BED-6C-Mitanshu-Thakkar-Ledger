import { Router } from "express";
import { trialBalance } from "../controllers/trialBalanceController";

const router = Router();

router.get("/trial-balance", trialBalance);

export default router;