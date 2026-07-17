export function validateTransaction(amount: number): void {
    if (amount <= 0) {
        throw new Error("Amount must be greater than zero.");
    }

    if (!Number.isFinite(amount)) {
        throw new Error("Invalid amount.");
    }
}