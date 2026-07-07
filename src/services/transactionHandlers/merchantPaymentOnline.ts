import { LedgerLine } from "../journalEntryService";

export function merchantPaymentOnline(
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