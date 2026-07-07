import { p2pTransfer } from "../../src/services/transactionHandlers/p2pTransfer";

describe("P2P Transfer Integration Test", () => {
  it("should create balanced transfer entries", () => {
    const lines = p2pTransfer(1, 2, 500);

    expect(lines).toHaveLength(2);

    expect(lines[0].amount).toBe(500);
    expect(lines[1].amount).toBe(500);
  });
});
