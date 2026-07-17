import { getTrialBalance } from "../../src/services/reportService";
import { verifyHashChain } from "../../src/services/auditService";

describe("Final Integration", () => {
  it("should generate a trial balance", async () => {
    const report = await getTrialBalance();

    expect(Array.isArray(report)).toBe(true);
  });

  it("should execute audit verification", async () => {
    const result = await verifyHashChain();

    expect(result).toHaveProperty("valid");
  });
});