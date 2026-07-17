import { LedgerLine } from "../journalEntryService";
import { validateTransaction } from "../../validators/transactionValidator";


export function accountClosureSweep(amount: number): LedgerLine[] {
    
    validateTransaction(amount);

    return [
        {
            accountId: 7, // Customer Deposit Liability
            entryType: "DEBIT",
            amount,
            currency: "INR"
        },
        {
            accountId: 11, // Retained Earnings
            entryType: "CREDIT",
            amount,
            currency: "INR"
        }
    ];
}