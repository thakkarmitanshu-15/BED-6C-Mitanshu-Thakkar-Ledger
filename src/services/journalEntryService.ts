import { PoolClient } from "pg";
import { randomUUID } from "crypto";
import { updateBalanceSnapshot } from "./balanceService";


export interface LedgerLine {
  accountId: number;
  entryType: "DEBIT" | "CREDIT";
  amount: number;
  currency: string;
  description?: string;

}

export async function createJournalEntry(
  client: PoolClient,
  transactionId: string,
  lines: LedgerLine[]
) {
  const debitTotal = lines
    .filter((line) => line.entryType === "DEBIT")
    .reduce((sum, line) => sum + line.amount, 0);

  const creditTotal = lines
    .filter((line) => line.entryType === "CREDIT")
    .reduce((sum, line) => sum + line.amount, 0);

  if (debitTotal !== creditTotal) {
    throw new Error("Journal entry is not balanced.");
  }

  const journalId = randomUUID();



  try {
    const updatedAccounts = new Set<number>();

    for (const line of lines) {

      updatedAccounts.add(line.accountId);

    await client.query(
  `
  INSERT INTO ledger_entries (
    journal_id,
    transaction_id,
    account_id,
    entry_type,
    amount,
    currency,
    idempotency_key,
    current_hash,
    created_by
  )
  VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
  `,
  [
    journalId,
    transactionId,
    line.accountId,
    line.entryType,
    line.amount,
    line.currency,
    randomUUID(),
    "initial_hash",
    "system"
  ]
);
    }

    // Balance snapshots are managed by the business service.
    // Do not recalculate them here during withdrawal processing.
  } catch (error) {
    throw error;
  }
}