import { LedgerLine } from "../journalEntryService";

export function deposit(
  walletAccount: number,
  depositLiability: number,
  amount: number
): LedgerLine[] {

  return [

    {
      accountId: walletAccount,
      entryType: "DEBIT",
      amount,
      currency: "INR"
    },

    {
      accountId: depositLiability,
      entryType: "CREDIT",
      amount,
      currency: "INR"
    }

  ];

}