import { refundFull } from "../../src/services/transactionHandlers/refundFull";

describe("Full Refund Handler", () => {

  it("creates mirror journal entries", () => {

    const entries = refundFull(
      1,
      2,
      1000
    );

    expect(entries).toHaveLength(2);

    expect(entries[0].entryType).toBe("DEBIT");
    expect(entries[1].entryType).toBe("CREDIT");

    expect(entries[0].amount).toBe(1000);
    expect(entries[1].amount).toBe(1000);

  });

});