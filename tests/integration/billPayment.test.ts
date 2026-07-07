import { billPayment } from "../../src/services/transactionHandlers/billPayment";

describe("Bill Payment", () => {
  it("should create balanced journal entries", () => {
    const lines = billPayment(1, 4, 500);

    expect(lines).toHaveLength(2);

    expect(lines[0].entryType).toBe("CREDIT");
    expect(lines[1].entryType).toBe("DEBIT");

    expect(lines[0].amount).toBe(500);
    expect(lines[1].amount).toBe(500);

    expect(lines[0].currency).toBe("INR");
    expect(lines[1].currency).toBe("INR");
  });
});