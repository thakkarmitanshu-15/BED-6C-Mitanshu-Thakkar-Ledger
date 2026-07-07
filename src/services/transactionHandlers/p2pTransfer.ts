import { LedgerLine } from "../journalEntryService";

export function p2pTransfer(
  senderWallet: number,
  receiverWallet: number,
  amount: number
): LedgerLine[] {
  return [
    {
      accountId: senderWallet,
      entryType: "CREDIT",
      amount,
      currency: "INR"
    },
    {
      accountId: receiverWallet,
      entryType: "DEBIT",
      amount,
      currency: "INR"
    }
  ];
}