import { apiRequest } from "./apiService"

export const loginRequest = (
  email: string,
  password: string
) => {
  return apiRequest(
    "/auth/login",
    {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    }
  )
}

export const registerRequest = (
  email: string,
  password: string
) => {
  return apiRequest(
    "/auth/register",
    {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    }
  )
}