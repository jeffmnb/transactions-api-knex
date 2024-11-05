import type { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table("transactions", (table) => {
    table.text("session_id").notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table("transactions", (table) => {
    table.dropColumn("session_id")
  })
}
