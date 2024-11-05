import { FastifyInstance } from "fastify"
import { db } from "../../../knexfile"
import { randomUUID } from "crypto"
import {
  createTransactionBodySchema,
  getSpecificTransactionParamsSchema,
} from "./transaction.utils"
import { getCookies } from "../../utils/getCookies/getCookies"

export const transactionsRoute = async (app: FastifyInstance) => {
  app.get("/transactions", async (req, res) => {
    const { session_id } = getCookies({ req, res, createCookie: false })
    if (!session_id) return res.status(401).send("Unauthorized")
    const transactions = await db("transactions").select("*")
    return { transactions }
  })

  app.get("/transactions/:id", async (req, res) => {
    const { data, error } = getSpecificTransactionParamsSchema.safeParse(
      req.params,
    )

    if (error) {
      return res.status(400).send(error)
    }

    const { id } = data

    const transaction = await db("transactions").where("id", id).first()

    if (!transaction) return res.status(404).send("Transaction not found!")

    return { transaction }
  })

  app.get("/transactions/summary", async () => {
    const summary = await db("transactions")
      .sum("amount", { as: "amount" })
      .first()
    return { summary: summary?.amount ?? 0 }
  })

  app.post("/transactions", async (req, res) => {
    const { data, error } = createTransactionBodySchema.safeParse(req.body)
    if (error) {
      return res.status(400).send(error)
    }

    const { amount, title, type } = data

    const { session_id } = getCookies({ res, req, createCookie: false })

    await db("transactions").insert({
      id: randomUUID(),
      session_id: session_id,
      title,
      amount: type === "credit" ? amount : amount * -1,
    })

    return res.status(201).send("Transacation created!")
  })
}
