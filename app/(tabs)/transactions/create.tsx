import { router } from "expo-router"

import {
  useFocusEffect,
} from "@react-navigation/native"

import {
  useCallback,
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
  Picker,
} from "@react-native-picker/picker"

import {
  useTransactions,
} from "../../../hooks/useTransactions"

import {
  useTransactionForm,
} from "../../../hooks/useTransactionForm"

import {
  useCategories,
} from "../../../hooks/useCategories"

export default function CreateTransactionScreen() {
  const {
    crearTransaccion,
  } = useTransactions()

  const {
    categories,
    recargar,
  } = useCategories()

  useFocusEffect(
    useCallback(() => {
      void recargar()
    }, [recargar])
  )

  const form =
    useTransactionForm({
      mode: "create",

      onSubmit: async (data) => {
        await crearTransaccion({
          amount: data.amount!,
          type: data.type!,
          description:
            data.description!,
          categoryId:
            data.categoryId!,
        })

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
            Nueva transacción
          </Text>

          <TextInput
            style={[
              styles.input,

              form.errores.amount
                ? styles.inputError
                : null,
            ]}
            placeholder="Monto"
            keyboardType="numeric"
            value={form.amount}
            onChangeText={
              form.setAmount
            }
          />

          {form.errores.amount ? (
            <Text style={styles.error}>
              {form.errores.amount}
            </Text>
          ) : null}

          <TextInput
            style={[
              styles.input,

              form.errores
                .description
                ? styles.inputError
                : null,
            ]}
            placeholder="Descripción"
            value={form.description}
            onChangeText={
              form.setDescription
            }
          />

          {form.errores
            .description ? (
            <Text style={styles.error}>
              {
                form.errores
                  .description
              }
            </Text>
          ) : null}

          <View style={styles.typeContainer}>
            <TouchableOpacity
              style={[
                styles.typeButton,

                form.type ===
                "income"
                  ? styles.activeType
                  : null,
              ]}
              onPress={() =>
                form.setType(
                  "income"
                )
              }
            >
              <Text>
                Ingreso
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.typeButton,

                form.type ===
                "expense"
                  ? styles.activeType
                  : null,
              ]}
              onPress={() =>
                form.setType(
                  "expense"
                )
              }
            >
              <Text>
                Egreso
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.picker}>
            <Picker
              selectedValue={
                form.categoryId
              }
              onValueChange={(
                value
              ) =>
                form.setCategoryId(
                  value
                )
              }
            >
              <Picker.Item
                label="Seleccione categoría"
                value=""
              />

              {categories.map(
                (category) => (
                  <Picker.Item
                    key={category.id}
                    label={
                      category.name
                    }
                    value={
                      category.id
                    }
                  />
                )
              )}
            </Picker>
          </View>

          {form.errores
            .categoryId ? (
            <Text style={styles.error}>
              {
                form.errores
                  .categoryId
              }
            </Text>
          ) : null}

          <TouchableOpacity
            style={styles.button}
            onPress={
              form.handleSubmit
            }
          >
            <Text
              style={
                styles.buttonText
              }
            >
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
    backgroundColor: "#fff",
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

  typeContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },

  typeButton: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
  },

  activeType: {
    backgroundColor: "#bfdbfe",
  },

  picker: {
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
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