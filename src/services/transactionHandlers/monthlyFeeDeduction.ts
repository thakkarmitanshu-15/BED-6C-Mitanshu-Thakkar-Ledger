import { LedgerLine } from "../journalEntryService";
import { validateTransaction } from "../../validators/transactionValidator";

export function monthlyFeeDeduction(amount: number): LedgerLine[] {
        
    validateTransaction(amount);

    return [
        {
            accountId: 7, // Customer Deposit Liability (2001)
            entryType: "DEBIT",
            amount,
            currency: "INR"
        },
        {
            accountId: 12, // Transaction Fee Revenue (4001)
            entryType: "CREDIT",
            amount,
            currency: "INR"
        }
    ];
}