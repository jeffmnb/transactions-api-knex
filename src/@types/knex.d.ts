import "knex"

declare module "knex/types/tables" {
  export interface Tables {
    transactions: {
      id: string
      session_id: string
      created_at: string
      title: string
      amount: number
    }
  }
}
