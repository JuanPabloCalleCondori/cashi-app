import { router } from "expo-router"

import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native"

import { useCategories } from "../../../hooks/useCategories"
import { useCategoryForm } from "../../../hooks/useCategoryForm"

export default function CreateCategoryScreen() {
  const { crearCategoria } =
    useCategories()

  const form = useCategoryForm({
    mode: "create",

    onSubmit: async (data) => {
      if (!data.name) return

      await crearCategoria({ name: data.name })

      router.back()
    },
  })

  return (
    <View style={styles.screen}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : "height"
        }
      >
        <View style={styles.container}>
          <Text style={styles.title}>
            Nueva categoría
          </Text>

          <TextInput
            style={[
              styles.input,

              form.errores.name
                ? styles.inputError
                : null,
            ]}
            placeholder="Nombre"
            value={form.name}
            onChangeText={form.setName}
          />

          {form.errores.name ? (
            <Text style={styles.error}>
              {form.errores.name}
            </Text>
          ) : null}

          <TouchableOpacity
            style={styles.button}
            onPress={form.handleSubmit}
          >
            <Text style={styles.buttonText}>
              Guardar
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  container: {
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },

  inputError: {
    borderColor: "red",
  },

  error: {
    color: "red",
    marginBottom: 12,
  },

  button: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
})