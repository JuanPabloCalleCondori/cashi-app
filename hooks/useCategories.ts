import AsyncStorage from "@react-native-async-storage/async-storage"
import {
  useCallback,
  useEffect,
  useState,
} from "react"

import type {
  Category,
  CreateCategoryInput,
  UpdateCategoryInput,
} from "../types/category"

const STORAGE_KEY = "categories"

export const useCategories = () => {
  const [categories, setCategories] =
    useState<Category[]>([])

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState<string | null>(null)

  const cargarCategorias =
    useCallback(async () => {
      try {
        setLoading(true)

        const raw =
          await AsyncStorage.getItem(
            STORAGE_KEY
          )

        const data: Category[] = raw
          ? JSON.parse(raw)
          : []

        setCategories(data)
      } catch {
        setError(
          "No se pudieron cargar las categorías"
        )
      } finally {
        setLoading(false)
      }
    }, [])

  useEffect(() => {
    cargarCategorias()
  }, [cargarCategorias])

  const persistir = async (
    nuevasCategorias: Category[]
  ) => {
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(nuevasCategorias)
    )

    setCategories(nuevasCategorias)
  }

  const crearCategoria = async (
    input: CreateCategoryInput
  ) => {
    const nueva: Category = {
      id: Date.now().toString(),
      ...input,
    }

    await persistir([
      ...categories,
      nueva,
    ])
  }

  const editarCategoria = async (
    id: string,
    input: UpdateCategoryInput
  ) => {
    const actualizadas =
      categories.map((c) =>
        c.id === id
          ? { ...c, ...input }
          : c
      )

    await persistir(actualizadas)
  }

  const eliminarCategoria = async (
    id: string
  ) => {
    await persistir(
      categories.filter(
        (c) => c.id !== id
      )
    )
  }

  return {
    categories,
    loading,
    error,
    crearCategoria,
    editarCategoria,
    eliminarCategoria,
    recargar: cargarCategorias,
  }
}
