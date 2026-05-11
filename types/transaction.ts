export interface Transaction {
  id: string

  amount: number

  type: "income" | "expense"

  description: string

  date: string

  categoryId: string
}

export interface CreateTransactionInput {
  amount: number

  type: "income" | "expense"

  description: string

  categoryId: string
}

export interface UpdateTransactionInput {
  amount?: number

  type?: "income" | "expense"

  description?: string

  categoryId?: string
}
