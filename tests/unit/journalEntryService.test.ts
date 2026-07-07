import { createJournalEntry } from "../../src/services/journalEntryService";

describe("Journal Entry Service", () => {
  it("should reject unbalanced journal entries", async () => {
    const mockClient: any = {
      query: jest.fn(),
    };

    await expect(
      createJournalEntry(mockClient, [
        {
          accountId: 1,
          entryType: "DEBIT",
          amount: 100,
          currency: "INR",
        },
        {
          accountId: 2,
          entryType: "CREDIT",
          amount: 90,
          currency: "INR",
        },
      ])
    ).rejects.toThrow("Journal entry is not balanced.");
  });
});