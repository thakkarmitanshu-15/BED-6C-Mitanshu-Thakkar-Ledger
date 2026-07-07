import { LedgerLine } from "../journalEntryService";

export function fxConversion(
  sourceAccount: number,
  destinationAccount: number,
  revenueAccount: number,
  sourceAmount: number,
  convertedAmount: number,
  fee: number
): LedgerLine[] {

  return [

    {
      accountId: sourceAccount,
      entryType: "CREDIT",
      amount: sourceAmount,
      currency: "USD"
    },

    {
      accountId: destinationAccount,
      entryType: "DEBIT",
      amount: convertedAmount,
      currency: "INR"
    },

    {
      accountId: revenueAccount,
      entryType: "CREDIT",
      amount: fee,
      currency: "INR"
    }

  ];

}