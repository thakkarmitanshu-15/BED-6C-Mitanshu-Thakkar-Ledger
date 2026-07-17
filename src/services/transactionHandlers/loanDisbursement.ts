import { LedgerLine } from "../journalEntryService";
import { validateTransaction } from "../../validators/transactionValidator";

export function loanDisbursement(amount: number): LedgerLine[] {
    
    validateTransaction(amount);


    return [
        {
            accountId: 5, // Loan Receivable – Personal
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