ALTER TABLE ledger_entries
ADD COLUMN transaction_id UUID
REFERENCES transactions(id);