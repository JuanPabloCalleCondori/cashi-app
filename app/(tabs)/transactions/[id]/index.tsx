import {
    router,
    useFocusEffect,
    useLocalSearchParams,
} from "expo-router"

import {
    Alert,
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
  } = useTransactions()

  const {
    categories,
  } = useCategories()

  useFocusEffect(
    useCallback(() => {
      void recargar()
    }, [recargar])
  )

  const transaction =
    transactions.find(
      (t) => t.id === id
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
        eliminarTransaccion(id!)
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
                id!
              )

              router.back()
            },
          },
        ]
      )
    }
  }

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

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() =>
              router.push({
                pathname:
                  "/(tabs)/transactions/[id]/edit",

                params: {
                  id,
                },
              })
            }
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