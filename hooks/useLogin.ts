import { useState } from "react"

const VALID_EMAIL = "usuario@correo.com"
const VALID_PASSWORD = "1234"

export const useLogin = () => {
  const [error, setError] = useState("")

  const login = (
    email: string,
    password: string
  ) => {
    if (
      email === VALID_EMAIL &&
      password === VALID_PASSWORD
    ) {
      setError("")
      return true
    }

    setError("Credenciales incorrectas")
    return false
  }

  return {
    login,
    error,
  }
}