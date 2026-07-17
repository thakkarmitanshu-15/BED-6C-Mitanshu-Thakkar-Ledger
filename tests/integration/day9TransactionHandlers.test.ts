import { interestPayout } from "../../src/services/transactionHandlers/interestPayout";
import { monthlyFeeDeduction } from "../../src/services/transactionHandlers/monthlyFeeDeduction";
import { cashbackCredit } from "../../src/services/transactionHandlers/cashbackCredit";

describe("Day 9 Transaction Handlers", () => {
    test("Interest payout creates balanced entries", () => {
        const entries = interestPayout(100);

        expect(entries).toHaveLength(2);
        expect(entries[0].amount).toBe(entries[1].amount);
    });

    test("Monthly fee creates balanced entries", () => {
        const entries = monthlyFeeDeduction(100);

        expect(entries).toHaveLength(2);
        expect(entries[0].amount).toBe(entries[1].amount);
    });

    test("Cashback creates balanced entries", () => {
        const entries = cashbackCredit(100);

        expect(entries).toHaveLength(2);
        expect(entries[0].amount).toBe(entries[1].amount);
    });
});