import { z } from "zod"

export const createTransactionBodySchema = z.object({
  title: z.string(),
  amount: z.number(),
  type: z.enum(["credit", "debit"]),
})

export const getSpecificTransactionParamsSchema = z.object({
  id: z.string(),
})
