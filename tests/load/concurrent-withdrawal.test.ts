import { processWithdrawal } from "../../src/services/withdrawalService";
import dotenv from "dotenv";

dotenv.config();

describe("Concurrent Withdrawal Load Test", () => {
  it("should allow only 20 successful withdrawals", async () => {
    const requests = [];

    for (let i = 0; i < 50; i++) {
      requests.push(
        processWithdrawal(
          1,      // Wallet Account
          7,      // Deposit Liability Account
          500     // Amount
        )
      );
    }

    const results = await Promise.allSettled(requests);

results.forEach((result, index) => {
  if (result.status === "rejected") {
    console.log(`Request ${index + 1}:`);
    console.log(result.reason);
  }
});

const success = results.filter(
  r => r.status === "fulfilled"
).length;

const failed = results.filter(
  r => r.status === "rejected"
).length;

console.log({ success, failed });

expect(success).toBe(20);
expect(failed).toBe(30);
  });
});