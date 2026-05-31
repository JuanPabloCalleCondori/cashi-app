import { useState } from "react"

import * as Location from "expo-location"

export const useLocation = () => {
  const [location, setLocation] =
    useState<{
      latitude: number
      longitude: number
    } | null>(null)

  const [loading, setLoading] =
    useState(false)

  const [error, setError] =
    useState("")

  const getCurrentLocation =
    async () => {
      try {
        setLoading(true)

        setError("")

        const permission =
          await Location.requestForegroundPermissionsAsync()

        if (!permission.granted) {
          setError(
            "Permiso de ubicación denegado"
          )

          return
        }

        const current =
          await Location.getCurrentPositionAsync(
            {}
          )

        setLocation({
          latitude:
            current.coords.latitude,

          longitude:
            current.coords.longitude,
        })
      } catch {
        setError(
          "No fue posible obtener la ubicación"
        )
      } finally {
        setLoading(false)
      }
    }

  return {
    location,

    loading,

    error,

    getCurrentLocation,
  }
}
