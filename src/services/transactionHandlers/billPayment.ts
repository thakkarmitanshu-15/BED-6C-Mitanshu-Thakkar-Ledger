import { LedgerLine } from "../journalEntryService";

export function billPayment(
  customerWallet: number,
  merchantSettlement: number,
  amount: number
): LedgerLine[] {
  return [
    {
      accountId: customerWallet,
      entryType: "CREDIT",
      amount,
      currency: "INR",
    },
    {
      accountId: merchantSettlement,
      entryType: "DEBIT",
      amount,
      currency: "INR",
    },
  ];
}