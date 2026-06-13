import {
  router,
  useLocalSearchParams,
} from "expo-router"

import {
  Image,
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
  useCallback,
  useMemo
} from "react"

import {
  useTransactions,
} from "../../../../hooks/useTransactions"

import {
  useCategories,
} from "../../../../hooks/useCategories"

import {
  useTransactionForm,
} from "../../../../hooks/useTransactionForm"

import {
  useImagePicker,
} from "../../../../hooks/useImagePicker"

import {
  useLocation,
} from "../../../../hooks/useLocation"

import {
  useFocusEffect,
} from "@react-navigation/native"


export default function EditTransactionScreen() {
  const { id } =
    useLocalSearchParams<{
      id: string
    }>()

    console.log(
  "ID recibido:",
  id
)


  const {
    transactions,
    editarTransaccion,
    loading,
    recargar,
  } = useTransactions()

    console.log(
  "Transacciones completas:",
  JSON.stringify(transactions, null, 2)
)

  const {
    categories,
    recargar: recargarCategorias,
  } = useCategories()

  console.log(
  "Categorías completas:",
  JSON.stringify(categories, null, 2)
)

  useFocusEffect(
    useCallback(() => {
      void recargar()
      void recargarCategorias()
    }, [recargar, recargarCategorias])
  )

  const imagePicker =
    useImagePicker()

  const locationHook =
    useLocation()

  const transaction =
    transactions.find(
      (t) => t.id === Number(id)
    )

    console.log(
  "Transacciones:",
  transactions
)

console.log(
  "Transacción encontrada en edit:",
  transaction?.id
)


const defaultValues = useMemo(() => {
  return transaction
    ? {
        amount: transaction.amount,
        type: transaction.type,
        description: transaction.description,
        categoryId: String(transaction.categoryId),

        photoUri: transaction.photoUri,
        location: transaction.location,
      }
    : undefined
}, [transaction])

  const form =
    useTransactionForm({
      mode: "edit",

      defaultValues,

      onSubmit: async (
        data
      ) => {
        await editarTransaccion(
          Number(id),
          {
            amount:
              data.amount,

            type:
              data.type,

            description:
              data.description,

            categoryId:
              Number(data.categoryId),

            photoUri:
              imagePicker.imageUri ||
              transaction?.photoUri,

            location:
              locationHook.location
                ? {
                    latitude:
                      locationHook
                        .location
                        .latitude,

                    longitude:
                      locationHook
                        .location
                        .longitude,
                  }
                : transaction?.location,
          }
        )

        router.back()
      },
    })

  if (loading) {
  return (
    <View style={styles.screen}>
      <View style={styles.centered}>
        <Text>
          Cargando...
        </Text>
      </View>
    </View>
  )
}

if (!transaction) {
  console.log("ID recibido:", id)
  console.log("Transacciones:", transactions)

  return (
    <View style={styles.screen}>
      <View style={styles.centered}>
        <Text style={styles.error}>
          Transacción no encontrada
        </Text>
      </View>
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
            Editar transacción
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

          <TouchableOpacity
            style={
              styles.secondaryButton
            }
            onPress={
              imagePicker.takePhoto
            }
          >
            <Text>
              Tomar foto
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={
              styles.secondaryButton
            }
            onPress={
              imagePicker.pickImage
            }
          >
            <Text>
              Seleccionar desde galería
            </Text>
          </TouchableOpacity>

          {imagePicker.error ? (
            <Text style={styles.error}>
              {imagePicker.error}
            </Text>
          ) : null}

          {imagePicker.imageUri ? (
            <Image
              source={{
                uri:
                  imagePicker.imageUri,
              }}
              style={
                styles.preview
              }
            />
          ) : transaction.photoUri ? (
            <Image
              source={{
                uri:
                  transaction.photoUri,
              }}
              style={
                styles.preview
              }
            />
          ) : null}

          <TouchableOpacity
            style={
              styles.secondaryButton
            }
            onPress={
              locationHook.getCurrentLocation
            }
          >
            <Text>
              Actualizar ubicación
            </Text>
          </TouchableOpacity>

          {locationHook.loading ? (
            <Text>
              Obteniendo ubicación...
            </Text>
          ) : null}

          {locationHook.error ? (
            <Text style={styles.error}>
              {locationHook.error}
            </Text>
          ) : null}

          {locationHook.location ? (
            <View>
              <Text>
                Latitud:{" "}
                {
                  locationHook
                    .location
                    .latitude
                }
              </Text>

              <Text>
                Longitud:{" "}
                {
                  locationHook
                    .location
                    .longitude
                }
              </Text>
            </View>
          ) : transaction.location ? (
            <View>
              <Text>
                Latitud:{" "}
                {
                  transaction
                    .location
                    .latitude
                }
              </Text>

              <Text>
                Longitud:{" "}
                {
                  transaction
                    .location
                    .longitude
                }
              </Text>
            </View>
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

  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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

  secondaryButton: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: "center",
  },

  preview: {
    width: "100%",
    height: 200,
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

