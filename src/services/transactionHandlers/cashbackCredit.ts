import { LedgerLine } from "../journalEntryService";
import { validateTransaction } from "../../validators/transactionValidator";

export function cashbackCredit(amount: number): LedgerLine[] {
    
    validateTransaction(amount);

    return [
        {
            accountId: 17, // Cashback Expense (5002)
            entryType: "DEBIT",
            amount,
            currency: "INR"
        },
        {
            accountId: 7, // Customer Deposit Liability (2001)
            entryType: "CREDIT",
            amount,
            currency: "INR"
        }
    ];
}