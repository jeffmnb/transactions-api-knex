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

  describe("creating new transactiion", () => {
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

    it("should return fail when create a new wrong transaction", async () => {
      const { statusCode } = await request(app.server)
        .post("/transactions")
        .send({
          title: 123,
          amount: "1000",
          type: "credit",
        })
      expect(statusCode).toBe(400)
    })
  })

  describe("get transactiion", () => {
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

    it("should return unauthorized when get transactions without cookies", async () => {
      const { statusCode } = await request(app.server).get("/transactions")
      expect(statusCode).toBe(401)
    })
  })
})
