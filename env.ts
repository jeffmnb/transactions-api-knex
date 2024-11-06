import { z } from "zod"
import "dotenv/config"

const envSchema = z.object({
  DATABASE_URL: z.string(),
  DATABASE_TEST_URL: z.string(),
  MIGRATIONS_URL: z.string(),
  NODE_ENV: z
    .enum(["development", "staging", "production", "test"])
    .default("development"),
})

const { error, data } = envSchema.safeParse(process.env)

if (error) {
  console.error("Invalid enviroment variables!", error)
  throw new Error("Invalid enviroment variables!", error)
}

export const env = data
