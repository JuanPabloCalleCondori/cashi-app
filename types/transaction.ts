export interface Transaction {
  id: number

  amount: number

  type: "income" | "expense"

  description: string

  date: string

  categoryId: number

  // NUEVO EVALUACIÓN 3

  photoUri?: string

  location?: {
    latitude: number
    longitude: number
  }
}

export interface CreateTransactionInput {
  amount: number

  type: "income" | "expense"

  description: string

  categoryId: number

  // NUEVO EVALUACIÓN 3

  photoUri?: string

  location?: {
    latitude: number
    longitude: number
  }
}

export interface UpdateTransactionInput {
  amount?: number

  type?: "income" | "expense"

  description?: string

  categoryId?: number

  // NUEVO EVALUACIÓN 3

  photoUri?: string

  location?: {
    latitude: number
    longitude: number
  }
}
