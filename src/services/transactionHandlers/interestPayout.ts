import { LedgerLine } from "../journalEntryService";
import { validateTransaction } from "../../validators/transactionValidator";


export function interestPayout(amount: number): LedgerLine[] {
       
    validateTransaction(amount);


    return [
        {
            accountId: 18, // 5003 Interest Expense – Savings
            entryType: "DEBIT",
            amount,
            currency: "INR",
            description: "Interest payout expense"
        },
        {
            accountId: 9, // 2010 Interest Payable – Savings
            entryType: "CREDIT",
            amount,
            currency: "INR",
            description: "Interest payable"
        }
    ];
}