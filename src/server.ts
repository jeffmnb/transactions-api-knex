import fastify from "fastify"
import { transactionsRoute } from "./routes/transactionsRoutes/transactions"

const app = fastify()

app.register(transactionsRoute)

app.listen({ port: 3000 }, () => {
  console.warn("server running on port 3000")
})
