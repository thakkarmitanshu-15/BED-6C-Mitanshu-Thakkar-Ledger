CREATE OR REPLACE FUNCTION prevent_ledger_change()
RETURNS TRIGGER
AS
$$

BEGIN

    RAISE EXCEPTION
    'Ledger entries cannot be updated or deleted.';

END;

$$
LANGUAGE plpgsql;


CREATE TRIGGER ledger_update_trigger

BEFORE UPDATE

ON ledger_entries

FOR EACH ROW

EXECUTE FUNCTION prevent_ledger_change();



CREATE TRIGGER ledger_delete_trigger

BEFORE DELETE

ON ledger_entries

FOR EACH ROW

EXECUTE FUNCTION prevent_ledger_change();