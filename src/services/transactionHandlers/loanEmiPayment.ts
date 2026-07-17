import { LedgerLine } from "../journalEntryService";
import { validateTransaction } from "../../validators/transactionValidator";


export function loanEmiPayment(amount: number): LedgerLine[] {
    
    validateTransaction(amount);

    return [
        {
            accountId: 7, // Customer Deposit Liability
            entryType: "DEBIT",
            amount,
            currency: "INR"
        },
        {
            accountId: 5, // Loan Receivable – Personal
            entryType: "CREDIT",
            amount,
            currency: "INR"
        }
    ];
}