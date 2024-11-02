import fastify from "fastify"
import knex from "knex"
import knexConfig from "../knexfile"

const app = fastify()
const db = knex(knexConfig.development)

app.get("/", async (req, res) => {
  const tables = await db("transactions").select("*") // knex que criamos dentro de knexfiles.ts
  return tables
})

app.listen({ port: 3000 }, () => {
  console.log("server running on port 3000")
})

// ao dar um GET nessa rota,ele vai criar o file app.db dentro de tmp
// e mostrar um array, pois ainda nao temos nenhuma tablea criada ainda.
