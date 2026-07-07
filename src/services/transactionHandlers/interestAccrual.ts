import { LedgerLine } from "../journalEntryService";

export function interestAccrual(
  interestExpense: number,
  interestPayable: number,
  amount: number
): LedgerLine[] {
  return [
    {
      accountId: interestExpense,
      entryType: "DEBIT",
      amount,
      currency: "INR",
    },
    {
      accountId: interestPayable,
      entryType: "CREDIT",
      amount,
      currency: "INR",
    },
  ];
}