import { Knex } from "knex"

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "sqlite",
    connection: {
      filename: "./src/db/app.db",
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./src/db/migrations",
      extension: "ts",
    },
  },
}

export default config
