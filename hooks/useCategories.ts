import {
  useCallback,
  useEffect,
  useState,
} from "react"

import {
  Category,
  CreateCategoryInput,
  UpdateCategoryInput,
} from "../types/category"

import { useAuth } from "../contexts/AuthContext"
import { categoryService } from "../services/categoryService"

export const useCategories = () => {
  const { token } = useAuth()

  const [categories, setCategories] =
    useState<Category[]>([])

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState<string | null>(null)

  const cargarCategorias =
    useCallback(async () => {
      if (!token) return

      try {
        setLoading(true)
        setError(null)

        const data =
          await categoryService.getAll(
            token
          )

        setCategories(data)
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "No se pudieron cargar las categorías"
        )
      } finally {
        setLoading(false)
      }
    }, [token])

  useEffect(() => {
    void cargarCategorias()
  }, [cargarCategorias])

  const crearCategoria = async (
    input: CreateCategoryInput
  ) => {
    if (!token) return

    const nueva =
      await categoryService.create(
        input.name,
        token
      )

    setCategories((prev) => [
      ...prev,
      nueva,
    ])
  }

  const editarCategoria = async (
    id: number,
    input: UpdateCategoryInput
  ) => {
    if (!token) return

    const actualizada =
      await categoryService.update(
        id,
        input.name ?? "",
        token
      )

    setCategories((prev) =>
      prev.map((c) =>
        c.id === id
          ? actualizada
          : c
      )
    )
  }

  const eliminarCategoria = async (
    id: number
  ) => {
    if (!token) return

    await categoryService.delete(
      id,
      token
    )

    setCategories((prev) =>
      prev.filter(
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
