import fastify from "fastify"
import { knex } from "./db/database"

const app = fastify()

app.get("/", async (req, res) => {
  const tables = await knex("sqlite_schema").select("*")
  return tables
})

app.listen({ port: 3000 }, () => {
  console.log("server running on port 3000")
})
