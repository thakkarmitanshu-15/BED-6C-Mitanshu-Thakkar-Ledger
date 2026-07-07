import { z } from "zod";

export const journalEntrySchema = z.object({
  transactionType: z.enum([
    "DEPOSIT",
    "WITHDRAWAL",
    "P2P_TRANSFER",
    "FEE_DEDUCTION"
  ]),
  amount: z.number().positive(),
  currency: z.string().length(3),
  accountId: z.number().int().positive(),
  idempotencyKey: z.string().uuid()
});