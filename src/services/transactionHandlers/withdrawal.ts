import { LedgerLine } from "../journalEntryService";

export function withdrawal(
  walletAccount: number,
  depositLiability: number,
  amount: number
): LedgerLine[] {

  return [

    {
      accountId: depositLiability,
      entryType: "DEBIT",
      amount,
      currency: "INR"
    },

    {
      accountId: walletAccount,
      entryType: "CREDIT",
      amount,
      currency: "INR"
    }

  ];

}