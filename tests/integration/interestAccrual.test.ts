import { interestAccrual } from "../../src/services/transactionHandlers/interestAccrual";

describe("Interest Accrual", () => {
  it("should create balanced journal entries", () => {
    const lines = interestAccrual(5003, 2010, 50);

    expect(lines).toHaveLength(2);

    expect(lines[0].entryType).toBe("DEBIT");
    expect(lines[1].entryType).toBe("CREDIT");

    expect(lines[0].amount).toBe(50);
    expect(lines[1].amount).toBe(50);

    expect(lines[0].currency).toBe("INR");
    expect(lines[1].currency).toBe("INR");
  });
});