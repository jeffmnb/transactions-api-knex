import type { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("transactions", (table) => {
    table.timestamp("created_at").notNullable().primary()
    table.uuid("id").primary().notNullable().defaultTo(knex.fn.now())
    table.text("title").notNullable()
    table.decimal("amout").notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("transactions")
}
