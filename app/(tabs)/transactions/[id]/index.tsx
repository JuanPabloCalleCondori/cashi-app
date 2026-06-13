import {
  router,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router"

import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"

import { useCallback } from "react"

import {
  useTransactions,
} from "../../../../hooks/useTransactions"

import {
  useCategories,
} from "../../../../hooks/useCategories"

export default function TransactionDetailScreen() {
  const { id } =
    useLocalSearchParams<{
      id: string
    }>()

  const {
    transactions,
    eliminarTransaccion,
    recargar,
    loading,
  } = useTransactions()


  const {
    categories,
  } = useCategories()

  useFocusEffect(
    useCallback(() => {
      void recargar()
    }, [recargar])
  )

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

  const transaction =
    transactions.find(
      (t) => t.id === Number(id)
    )
  console.log(
  "Transaction encontrada:",
  transaction?.id
  )


  if (!transaction) {
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

  const category =
    categories.find(
      (c) =>
        c.id ===
        transaction.categoryId
    )

  const handleDelete = () => {
    if (Platform.OS === "web") {
      const confirmed =
        window.confirm(
          "¿Eliminar transacción?"
        )

      if (confirmed) {
        eliminarTransaccion(Number(id))
          .then(() =>
            router.back()
          )
      }
    } else {
      Alert.alert(
        "Eliminar",
        "¿Deseas eliminar esta transacción?",
        [
          {
            text: "Cancelar",
            style: "cancel",
          },

          {
            text: "Eliminar",

            style: "destructive",

            onPress: async () => {
              await eliminarTransaccion(
                Number(id)
              )

              router.back()
            },
          },
        ]
      )
    }
  }

  console.log(
  "TRANSACTION DETAIL:",
  JSON.stringify(transaction, null, 2)
)

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={
          styles.container
        }
      >
        <Text style={styles.title}>
          {
            transaction.description
          }
        </Text>

        <Text style={styles.amount}>
          $
          {
            transaction.amount
          }
        </Text>

        <Text style={styles.type}>
          {transaction.type ===
          "income"
            ? "Ingreso"
            : "Egreso"}
        </Text>

        <Text style={styles.category}>
          Categoría:{" "}
          {category?.name ??
            "Sin categoría"}
        </Text>

        <Text style={styles.date}>
          {new Date(
            transaction.date
          ).toLocaleDateString()}
        </Text>

        {transaction.photoUri ? (
          <View style={styles.section}>
            <Text
              style={
                styles.sectionTitle
              }
            >
              Comprobante
            </Text>

            <Image
              source={{
                uri:
                  transaction.photoUri,
              }}
              style={styles.photo}
            />
          </View>
        ) : null}

        {transaction.location ? (
          <View style={styles.section}>
            <Text
              style={
                styles.sectionTitle
              }
            >
              Ubicación
            </Text>

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

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => {
               console.log(
      "ID detalle:",
      transaction.id
    )

    console.log(
      "ID enviado a edit:",
      id
    )       
              router.push({
                pathname:
                  "/(tabs)/transactions/[id]/edit",

                params: {
                  id: Number(id),
                },
              })
            }}
          >
            <Text
              style={
                styles.buttonText
              }
            >
              Editar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={
              styles.deleteButton
            }
            onPress={
              handleDelete
            }
          >
            <Text
              style={
                styles.buttonText
              }
            >
              Eliminar
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12,
  },

  amount: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },

  type: {
    fontSize: 18,
    marginBottom: 8,
  },

  category: {
    fontSize: 18,
    marginBottom: 8,
  },

  date: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
  },

  section: {
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },

  photo: {
    width: "100%",
    height: 250,
    borderRadius: 8,
  },

  actions: {
    flexDirection: "row",
    gap: 12,
  },

  editButton: {
    flex: 1,
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },

  deleteButton: {
    flex: 1,
    backgroundColor: "#dc2626",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  error: {
    fontSize: 18,
    color: "red",
  },
})
