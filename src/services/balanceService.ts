import { PoolClient } from "pg";

export async function updateBalanceSnapshot(
  client: PoolClient,
  accountId: number
): Promise<void> {
  const accountResult = await client.query(
    "SELECT account_type, currency FROM accounts WHERE id = $1",
    [accountId]
  );

  if (accountResult.rows.length === 0) {
    throw new Error("Account not found");
  }

  const { account_type, currency } = accountResult.rows[0];

  const result = await client.query(
    `
    SELECT
      COALESCE(
        SUM(CASE WHEN entry_type = 'DEBIT' THEN amount ELSE 0 END),
        0
      ) AS debits,
      COALESCE(
        SUM(CASE WHEN entry_type = 'CREDIT' THEN amount ELSE 0 END),
        0
      ) AS credits
    FROM ledger_entries
    WHERE account_id = $1
    `,
    [accountId]
  );

  const debits = Number(result.rows[0].debits);
  const credits = Number(result.rows[0].credits);

  let balance = 0;

  if (["Asset", "Expense"].includes(account_type)) {
    balance = debits - credits;
  } else {
    balance = credits - debits;
  }

  await client.query(
    `
    INSERT INTO balance_snapshots
      (account_id, balance, currency, last_updated)
    VALUES
      ($1, $2, $3, CURRENT_TIMESTAMP)
    ON CONFLICT (account_id)
    DO UPDATE
    SET
      balance = EXCLUDED.balance,
      currency = EXCLUDED.currency,
      last_updated = CURRENT_TIMESTAMP
    `,
    [accountId, balance, currency]
  );
}