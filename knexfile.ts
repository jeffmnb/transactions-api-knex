import knex, { Knex } from "knex"
import { env } from "./env"

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "sqlite",
    connection: {
      filename: env.DATABASE_URL,
    },
    useNullAsDefault: true,
    migrations: {
      directory: process.env.MIGRATIONS_URL,
      extension: "ts",
    },
  },
  test: {
    client: "sqlite",
    connection: {
      filename: env.DATABASE_TEST_URL,
    },
    useNullAsDefault: true,
    migrations: {
      directory: process.env.MIGRATIONS_URL,
      extension: "ts",
    },
  },
  production: {
    client: "mysql",
    connection: {
      filename: env.DATABASE_URL,
    },
    useNullAsDefault: true,
    migrations: {
      directory: env.MIGRATIONS_URL,
      extension: "ts",
    },
  },
}

export default config[env.NODE_ENV]

export const db = knex(config[env.NODE_ENV])
