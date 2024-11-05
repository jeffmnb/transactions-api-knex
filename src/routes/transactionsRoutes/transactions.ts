import { FastifyInstance } from "fastify"
import { db } from "../../../knexfile"
import { randomUUID } from "crypto"
import {
  createTransactionBodySchema,
  getSpecificTransactionParamsSchema,
} from "./transaction.utils"

export const transactionsRoute = async (app: FastifyInstance) => {
  app.get("/transactions", async () => {
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
    return await db("transactions").where("id", id).first()
  })

  app.get("/transactions/summary", async () => {
    return await db("transactions").sum("amount", { as: "amount" }).first()
  })

  app.post("/transactions", async (req, res) => {
    const { data, error } = createTransactionBodySchema.safeParse(req.body)
    if (error) {
      return res.status(400).send(error)
    }

    const { amount, title, type } = data

    await db("transactions").insert({
      id: randomUUID(),
      title,
      amount: type === "credit" ? amount : amount * -1,
    })

    return res.status(201).send("Transacation created!")
  })
}
