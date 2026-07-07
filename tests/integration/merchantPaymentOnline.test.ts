import { merchantPaymentOnline } from "../../src/services/transactionHandlers/merchantPaymentOnline";

describe("Merchant Payment Online", () => {
  it("should create balanced journal entries", () => {
    const lines = merchantPaymentOnline(1, 4, 200);

    expect(lines).toHaveLength(2);

    expect(lines[0].entryType).toBe("CREDIT");
    expect(lines[1].entryType).toBe("DEBIT");

    expect(lines[0].amount).toBe(200);
    expect(lines[1].amount).toBe(200);

    expect(lines[0].currency).toBe("INR");
    expect(lines[1].currency).toBe("INR");
  });
});