import { PoolClient } from "pg";

export async function lockAccount(
  client: PoolClient,
  accountId: number
): Promise<void> {
  await client.query(
    `
    SELECT *
    FROM balance_snapshots
    WHERE account_id = $1
    FOR UPDATE
    `,
    [accountId]
  );
}

export async function lockAccounts(
  client: PoolClient,
  accountA: number,
  accountB: number
): Promise<void> {
  const accounts = [accountA, accountB].sort((a, b) => a - b);

  await client.query(
    `
    SELECT *
    FROM balance_snapshots
    WHERE account_id = ANY($1)
    ORDER BY account_id
    FOR UPDATE
    `,
    [accounts]
  );
}