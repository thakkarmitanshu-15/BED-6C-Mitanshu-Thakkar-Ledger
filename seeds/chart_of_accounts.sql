INSERT INTO accounts
(account_code, account_name, account_type, account_sub_type, currency)
VALUES
('1001','Customer Wallet – Primary (INR)','Asset','Current Asset','INR'),
('1002','Customer Wallet – USD Holdings','Asset','Current Asset','USD'),
('1003','Customer Wallet – EUR Holdings','Asset','Current Asset','EUR'),
('1010','Merchant Settlement – Pending','Asset','Current Asset','INR'),
('1020','Loan Receivable – Personal','Asset','Non-Current Asset','INR'),
('1030','Interest Receivable – Accrued','Asset','Current Asset','INR'),

('2001','Customer Deposit Liability','Liability','Current Liability','INR'),
('2002','Merchant Payable – Pending','Liability','Current Liability','INR'),
('2010','Interest Payable – Savings','Liability','Current Liability','INR'),
('2020','Tax Collected at Source (TCS)','Liability','Current Liability','INR'),

('3001','Retained Earnings','Equity','Retained Earnings','INR'),

('4001','Transaction Fee Revenue','Revenue','Operating Revenue','INR'),
('4002','Interest Income – Loans','Revenue','Operating Revenue','INR'),
('4003','FX Conversion Revenue','Revenue','Operating Revenue','INR'),
('4010','Interchange Revenue','Revenue','Operating Revenue','INR'),

('5001','Payment Gateway Fees','Expense','Operating Expense','INR'),
('5002','Cashback Expense','Expense','Marketing Expense','INR'),
('5003','Interest Expense – Savings','Expense','Operating Expense','INR'),
('5010','FX Conversion Cost','Expense','Operating Expense','INR');