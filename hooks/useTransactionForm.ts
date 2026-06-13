import {
  useEffect,
  useState,
} from "react"

import {
  createTransactionSchema,
  updateTransactionSchema,
  type CreateTransactionInput,
  type UpdateTransactionInput,
} from "../schemas/transaction.schema"

type Mode =
  | "create"
  | "edit"

interface Props {
  mode: Mode

  defaultValues?: {
    amount: number

    type:
      | "income"
      | "expense"

    description: string

    categoryId: string

    photoUri?: string

    location?: {
      latitude: number
      longitude: number
    }
  }

  onSubmit: (
    data:
      | CreateTransactionInput
      | UpdateTransactionInput
  ) => Promise<void>
}

export const useTransactionForm = ({
  mode,
  defaultValues,
  onSubmit,
}: Props) => {
  const [amount, setAmount] =
    useState(
      defaultValues?.amount?.toString() ??
        ""
    )

  const [type, setType] =
    useState<
      "income" | "expense"
    >(
      defaultValues?.type ??
        "expense"
    )

  const [
    description,
    setDescription,
  ] = useState(
    defaultValues?.description ??
      ""
  )

  const [
    categoryId,
    setCategoryId,
  ] = useState(
    defaultValues?.categoryId ??
      ""
  )

  const [
    photoUri,
    setPhotoUri,
  ] = useState(
    defaultValues?.photoUri ??
      ""
  )

  const [
    location,
    setLocation,
  ] = useState<
    | {
        latitude: number
        longitude: number
      }
    | undefined
  >(
    defaultValues?.location
  )

  const [errores, setErrores] =
    useState<
      Record<string, string>
    >({})

  const [
    submitting,
    setSubmitting,
  ] = useState(false)

  useEffect(() => {
    if (defaultValues) {
      setAmount(
        defaultValues.amount.toString()
      )

      setType(defaultValues.type)

      setDescription(
        defaultValues.description
      )

      setCategoryId(
        defaultValues.categoryId
      )

      setPhotoUri(
        defaultValues.photoUri ?? ""
      )

      setLocation(
        defaultValues.location
      )
    } else if (mode === "create") {
      setAmount("")
      setType("expense")
      setDescription("")
      setCategoryId("")
      setPhotoUri("")
      setLocation(undefined)
      setErrores({})
    }
  }, [defaultValues, mode])

  const handleSubmit =
    async () => {
      const schema =
        mode === "create"
          ? createTransactionSchema
          : updateTransactionSchema

      const data = {
        amount:
          Number(amount),

        type,

        description,

        categoryId,

        photoUri,

        location,
      }

      const result =
        schema.safeParse(data)

      if (!result.success) {
        const flat =
          result.error.flatten()

        setErrores({
          amount:
            flat.fieldErrors
              .amount?.[0] ?? "",

          description:
            flat.fieldErrors
              .description?.[0] ??
            "",

          categoryId:
            flat.fieldErrors
              .categoryId?.[0] ??
            "",
        })

        return
      }

      setErrores({})

      setSubmitting(true)

      try {
        await onSubmit(
          result.data
        )
      } finally {
        setSubmitting(false)
      }
    }

  const reset = () => {
    setAmount("")
    setType("expense")
    setDescription("")
    setCategoryId("")
    setPhotoUri("")
    setLocation(undefined)
    setErrores({})
  }

  return {
    amount,
    setAmount,

    type,
    setType,

    description,
    setDescription,

    categoryId,
    setCategoryId,

    photoUri,
    setPhotoUri,

    location,
    setLocation,

    errores,

    submitting,

    handleSubmit,

    reset,
  }
}
