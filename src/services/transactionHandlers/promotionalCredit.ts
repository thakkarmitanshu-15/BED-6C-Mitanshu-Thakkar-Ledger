import { LedgerLine } from "../journalEntryService";
import { validateTransaction } from "../../validators/transactionValidator";

export function promotionalCredit(amount: number): LedgerLine[] {
     
    validateTransaction(amount);


    return [
        {
            accountId: 17, // Cashback Expense (used as promotional expense)
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