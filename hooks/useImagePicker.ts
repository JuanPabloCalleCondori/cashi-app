import { useState } from "react"

import * as ImagePicker from "expo-image-picker"

export const useImagePicker = () => {
  const [imageUri, setImageUri] =
    useState<string>("")

  const [error, setError] =
    useState<string>("")

  const takePhoto = async () => {
    try {
      setError("")

      const permission =
        await ImagePicker.requestCameraPermissionsAsync()

      if (!permission.granted) {
        setError(
          "Permiso de cámara denegado"
        )

        return
      }

      const result =
        await ImagePicker.launchCameraAsync({
          mediaTypes: ["images"],
          quality: 0.8,
        })

      if (!result.canceled) {
        setImageUri(
          result.assets[0].uri
        )
      }
    } catch {
      setError(
        "No fue posible tomar la foto"
      )
    }
  }

  const pickImage = async () => {
    try {
      setError("")

      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync()

      if (!permission.granted) {
        setError(
          "Permiso de galería denegado"
        )

        return
      }

      const result =
        await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ["images"],
          quality: 0.8,
        })

      if (!result.canceled) {
        setImageUri(
          result.assets[0].uri
        )
      }
    } catch {
      setError(
        "No fue posible seleccionar la imagen"
      )
    }
  }

  return {
  imageUri,
  setImageUri,

  error,

  takePhoto,
  pickImage,
}
}
