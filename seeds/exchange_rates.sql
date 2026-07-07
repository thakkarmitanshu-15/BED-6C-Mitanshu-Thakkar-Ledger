INSERT INTO exchange_rate_snapshots
(base_currency,target_currency,exchange_rate,valid_from,valid_until)

VALUES

('USD','INR',86.250000,NOW(),NOW()+INTERVAL '1 day'),

('EUR','INR',101.500000,NOW(),NOW()+INTERVAL '1 day'),

('GBP','INR',117.800000,NOW(),NOW()+INTERVAL '1 day'),

('JPY','INR',0.590000,NOW(),NOW()+INTERVAL '1 day');