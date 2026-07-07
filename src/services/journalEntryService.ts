import { PoolClient } from "pg";
import { randomUUID } from "crypto";

export interface LedgerLine {
  accountId: number;
  entryType: "DEBIT" | "CREDIT";
  amount: number;
  currency: string;
}

export async function createJournalEntry(
  client: PoolClient,
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

  await client.query("BEGIN");

  try {
    for (const line of lines) {
      await client.query(
        `
        INSERT INTO ledger_entries (
          journal_id,
          account_id,
          entry_type,
          amount,
          currency,
          idempotency_key,
          current_hash,
          created_by
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
        `,
        [
          journalId,
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

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  }
}