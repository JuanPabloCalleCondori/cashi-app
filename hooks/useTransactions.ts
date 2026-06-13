import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"

import type {
  CreateTransactionInput,
  Transaction,
  UpdateTransactionInput,
} from "../types/transaction"

import { useAuth } from "../contexts/AuthContext"
import { transactionService } from "../services/transactionService"

export const useTransactions = () => {
  const { token } = useAuth()

  const [transactions, setTransactions] =
    useState<Transaction[]>([])

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState<string | null>(null)

  const cargarTransacciones =
    useCallback(async () => {
      if (!token) return

      try {
        setLoading(true)

        const data =
          await transactionService.getAll(
            token
          )

        setTransactions(
          data.map((t: any) => ({
            ...t,

            photoUri: t.receiptUrl
              ? t.receiptUrl.startsWith("http")
                ? t.receiptUrl
                : `https://cashi-api-bnii.onrender.com${t.receiptUrl}`
              : undefined,

            location:
              t.latitude != null &&
              t.longitude != null
                ? {
                    latitude: t.latitude,
                    longitude: t.longitude,
                  }
                : undefined,
          }))
        )
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Error al cargar transacciones"
        )
      } finally {
        setLoading(false)
      }
    }, [token])

  useEffect(() => {
    void cargarTransacciones()
  }, [cargarTransacciones])

  const crearTransaccion =
    async (
      input: CreateTransactionInput
    ) => {
      if (!token) return

      const payload = {
        amount: input.amount,

        type: input.type,

        description:
          input.description,

        date:
          new Date().toISOString(),

        categoryId:
          Number(input.categoryId),

        receiptUrl:
          input.photoUri,

        latitude:
          input.location?.latitude,

        longitude:
          input.location?.longitude,
      }

      await transactionService.create(
        payload,
        token
      )

      await cargarTransacciones()
    }

  const editarTransaccion =
    async (
      id: number,
      input: UpdateTransactionInput
    ) => {
      if (!token) return

      const payload = {
        amount: input.amount,

        type: input.type,

        description:
          input.description,

        categoryId:
          input.categoryId
            ? Number(
                input.categoryId
              )
            : undefined,

        receiptUrl:
          input.photoUri,

        latitude:
          input.location?.latitude,

        longitude:
          input.location?.longitude,
      }

      await transactionService.update(
        id,
        payload,
        token
      )

      await cargarTransacciones()
    }

  const eliminarTransaccion =
    async (id: number) => {
      if (!token) return

      await transactionService.delete(
        id,
        token
      )

      await cargarTransacciones()
    }

  const totalIncome =
    useMemo(() => {
      return transactions
        .filter(
          (t) =>
            t.type === "income"
        )
        .reduce(
          (acc, curr) =>
            acc + curr.amount,
          0
        )
    }, [transactions])

  const totalExpense =
    useMemo(() => {
      return transactions
        .filter(
          (t) =>
            t.type === "expense"
        )
        .reduce(
          (acc, curr) =>
            acc + curr.amount,
          0
        )
    }, [transactions])

  const balance =
    totalIncome - totalExpense

  return {
    transactions,

    loading,

    error,

    crearTransaccion,

    editarTransaccion,

    eliminarTransaccion,

    recargar:
      cargarTransacciones,

    totalIncome,

    totalExpense,

    balance,
  }
}