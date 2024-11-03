import fastify from "fastify"
import knex from "knex"
import knexConfig from "../knexfile"

const app = fastify()
const db = knex(knexConfig)

app.get("/", async (req, res) => {
  const tables = await db("transactions").select("*")
  return tables
})

app.listen({ port: 3000 }, () => {
  console.log("server running on port 3000")
})
