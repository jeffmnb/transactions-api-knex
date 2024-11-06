import type { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("transactions", (table) => {
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now())
    table.uuid("id").primary().notNullable()
    table.text("title").notNullable()
    table.decimal("amount").notNullable()
    table.text("session_id").nullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("transactions")
}
