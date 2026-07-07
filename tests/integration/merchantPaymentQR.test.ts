import { merchantPaymentQR } from "../../src/services/transactionHandlers/merchantPaymentQR";

describe("Merchant Payment QR", () => {
  it("should create balanced journal entries", () => {
    const lines = merchantPaymentQR(1, 4, 100);

    expect(lines).toHaveLength(2);

    expect(lines[0].entryType).toBe("CREDIT");
    expect(lines[1].entryType).toBe("DEBIT");

    expect(lines[0].amount).toBe(100);
    expect(lines[1].amount).toBe(100);

    expect(lines[0].currency).toBe("INR");
    expect(lines[1].currency).toBe("INR");
  });
});