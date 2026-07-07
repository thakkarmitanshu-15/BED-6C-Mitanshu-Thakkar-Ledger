import { LedgerLine } from "../journalEntryService";

export function feeDeduction(
  walletAccount: number,
  feeRevenueAccount: number,
  amount: number
): LedgerLine[] {
  return [
    {
      accountId: walletAccount,
      entryType: "CREDIT",
      amount,
      currency: "INR"
    },
    {
      accountId: feeRevenueAccount,
      entryType: "DEBIT",
      amount,
      currency: "INR"
    }
  ];
}