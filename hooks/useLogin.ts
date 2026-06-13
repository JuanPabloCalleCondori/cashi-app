import { useState } from "react"

import { useAuth } from "../contexts/AuthContext"
import { loginRequest } from "../services/authService"

export const useLogin = () => {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const { login: saveToken } = useAuth()

  const login = async (
    email: string,
    password: string
  ) => {
    try {
      setLoading(true)
      setError("")

      const response =
        await loginRequest(
          email,
          password
        )

      await saveToken(
        response.token
      )

      return true
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Error al iniciar sesión"
      )

      return false
    } finally {
      setLoading(false)
    }
  }

  return {
    login,
    error,
    loading,
  }
}