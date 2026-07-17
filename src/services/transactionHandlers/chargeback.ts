import { LedgerLine } from "../journalEntryService";
import { validateTransaction } from "../../validators/transactionValidator";


export function chargeback(amount: number): LedgerLine[] {
    
    validateTransaction(amount);

    return [
        {
            accountId: 8, // Merchant Payable – Pending
            entryType: "DEBIT",
            amount,
            currency: "INR"
        },
        {
            accountId: 7, // Customer Deposit Liability
            entryType: "CREDIT",
            amount,
            currency: "INR"
        }
    ];
}