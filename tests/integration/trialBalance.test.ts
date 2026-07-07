import dotenv from "dotenv";
dotenv.config();

import { getTrialBalance } from "../../src/services/trialBalanceService";

describe("Trial Balance Integration Test", () => {
  it("should return a trial balance report", async () => {
    const report = await getTrialBalance();

    expect(report).toBeDefined();
    expect(Array.isArray(report)).toBe(true);
  });
});