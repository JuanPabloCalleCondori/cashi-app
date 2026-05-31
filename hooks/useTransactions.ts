import AsyncStorage from "@react-native-async-storage/async-storage"

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

import { eventEmitter } from "../utils/eventEmitter"

const STORAGE_KEY =
  "transactions"

export const useTransactions =
  () => {
    const [
      transactions,
      setTransactions,
    ] = useState<Transaction[]>([])

    const [loading, setLoading] =
      useState(true)

    const [error, setError] =
      useState<string | null>(null)

    const cargarTransacciones =
      useCallback(async () => {
        try {
          setLoading(true)

          const raw =
            await AsyncStorage.getItem(
              STORAGE_KEY
            )

          const data: Transaction[] =
            raw
              ? JSON.parse(raw)
              : []

          setTransactions(data)
        } catch {
          setError(
            "No se pudieron cargar las transacciones"
          )
        } finally {
          setLoading(false)
        }
      }, [])

    useEffect(() => {
      cargarTransacciones()
      
      // Suscribirse a cambios de transacciones desde otros componentes
      const unsubscribe =
        eventEmitter.on(
          "transactions-changed",
          cargarTransacciones
        )

      return unsubscribe
    }, [cargarTransacciones])

    const persistir = async (
      nuevas: Transaction[]
    ) => {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(nuevas)
      )

      setTransactions(nuevas)
      
      // Notificar a todos los componentes que usan useTransactions
      eventEmitter.emit("transactions-changed")
    }

    const crearTransaccion =
      async (
        input: CreateTransactionInput
      ) => {
        const nueva: Transaction = {
          id: Date.now().toString(),

          ...input,

          date:
            new Date().toISOString(),
        }

        await persistir([
          ...transactions,
          nueva,
        ])
      }

    const editarTransaccion =
      async (
        id: string,
        input: UpdateTransactionInput
      ) => {
        const actualizadas =
          transactions.map((t) =>
            t.id === id
              ? { ...t, ...input }
              : t
          )

        await persistir(actualizadas)
      }

    const eliminarTransaccion =
      async (id: string) => {
        await persistir(
          transactions.filter(
            (t) => t.id !== id
          )
        )
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