import { LedgerLine } from "../journalEntryService";

export function refundFull(
  customerWallet: number,
  merchantAccount: number,
  amount: number,
  currency: string = "INR"
): LedgerLine[] {

  return [

    // Customer receives money back
    {
      accountId: customerWallet,
      entryType: "DEBIT",
      amount,
      currency
    },

    // Merchant loses money
    {
      accountId: merchantAccount,
      entryType: "CREDIT",
      amount,
      currency
    }

  ];

}