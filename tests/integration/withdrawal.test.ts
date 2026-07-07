import { withdrawal } from "../../src/services/transactionHandlers/withdrawal";

describe("Withdrawal Integration Test", () => {
  it("should create balanced withdrawal entries", () => {
    const lines = withdrawal(1, 7, 100);

    expect(lines).toHaveLength(2);

    expect(lines[0].amount).toBe(100);
    expect(lines[1].amount).toBe(100);
  });
});
