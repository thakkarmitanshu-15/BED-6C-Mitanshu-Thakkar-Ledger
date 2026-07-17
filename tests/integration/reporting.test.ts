import { getTrialBalance } from "../../src/services/reportService";

describe("Reporting", () => {
  it("should generate a trial balance", async () => {
    const report = await getTrialBalance();

    expect(Array.isArray(report)).toBe(true);
  });
});