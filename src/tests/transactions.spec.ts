import { expect, it, describe, beforeAll, afterAll, beforeEach } from "vitest"
import request from "supertest"
import { app } from "../server"
import { execSync } from "node:child_process"

describe("transactions routes", () => {
  beforeAll(async () => {
    await app.ready()
  })

  beforeEach(async () => {
    execSync("npm run knex migrate:rollback --all")
    execSync("npm run knex migrate:latest")
  })

  afterAll(async () => {
    await app.close()
  })

  it("should return succes when create a new transaction", async () => {
    const { statusCode } = await request(app.server)
      .post("/transactions")
      .send({
        title: "Freela",
        amount: 1000,
        type: "credit",
      })
    expect(statusCode).toBe(201)
  })

  it("should return succes when get transactions", async () => {
    const response = await request(app.server).post("/transactions").send({
      title: "Freela",
      amount: 1000,
      type: "credit",
    })

    const cookies = response.get("Set-Cookie")

    const { statusCode } = await request(app.server)
      .get("/transactions")
      .set("Cookie", cookies!)
    expect(statusCode).toBe(200)
  })
})
