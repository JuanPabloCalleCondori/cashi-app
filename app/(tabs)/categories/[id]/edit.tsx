import {
  router,
  useLocalSearchParams,
} from "expo-router"

import {
  useMemo,
} from "react"

import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"

import {
  useCategories,
} from "../../../../hooks/useCategories"

import {
  useCategoryForm,
} from "../../../../hooks/useCategoryForm"

export default function EditCategoryScreen() {
  const { id } =
    useLocalSearchParams<{
      id: string
    }>()

  const {
    categories,
    editarCategoria,
  } = useCategories()

  const category =
    categories.find(
      (c) => c.id === Number(id)
    )

  const defaultValues =
    useMemo(() => {
      return category
        ? {
            name: category.name,
          }
        : undefined
    }, [category])

  const form = useCategoryForm({
    mode: "edit",

    defaultValues,

    onSubmit: async (data) => {
      await editarCategoria(
        Number(id),
        data
      )

      router.back()
    },
  })

  if (!category) {
    return (
      <View style={styles.centered}>
        <Text>
          Categoría no encontrada
        </Text>

        <TouchableOpacity
          onPress={() =>
            router.back()
          }
        >
          <Text style={styles.link}>
            Volver
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

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
            Editar categoría
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

            onChangeText={
              form.setName
            }
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
              Guardar cambios
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
    backgroundColor: "#fff",
  },

  container: {
    padding: 20,
  },

  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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

  link: {
    marginTop: 12,
    color: "#2563eb",
  },
})