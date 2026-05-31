export interface Transaction {
  id: string

  amount: number

  type: "income" | "expense"

  description: string

  date: string

  categoryId: string

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

  categoryId: string

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

  categoryId?: string

  // NUEVO EVALUACIÓN 3

  photoUri?: string

  location?: {
    latitude: number
    longitude: number
  }
}
