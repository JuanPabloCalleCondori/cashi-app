import * as z from "zod"

export const createTransactionSchema =
  z.object({
    amount: z
  .number()
  .positive(
    "El monto debe ser mayor a 0"
  ),

    type: z.enum([
      "income",
      "expense",
    ]),

    description: z
      .string()
      .min(
        1,
        "La descripción es requerida"
      ),

    categoryId: z
      .string()
      .min(
        1,
        "Seleccione una categoría"
      ),
  })

export const updateTransactionSchema =
  createTransactionSchema.partial()

export type CreateTransactionInput =
  z.infer<
    typeof createTransactionSchema
  >

export type UpdateTransactionInput =
  z.infer<
    typeof updateTransactionSchema
  >
  