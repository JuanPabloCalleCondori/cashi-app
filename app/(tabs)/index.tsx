import {
  useFocusEffect,
} from "@react-navigation/native"

import {
  router,
} from "expo-router"

import {
  useCallback,
} from "react"

import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"

import {
  SafeAreaView,
} from "react-native-safe-area-context"

import {
  useTransactions,
} from "../../hooks/useTransactions"

import {
  useCategories,
} from "../../hooks/useCategories"

export default function TransactionsScreen() {
  const {
    transactions,
    loading,
    error,
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

  const getCategoryName = (
    categoryId: string
  ) => {
    const category =
      categories.find(
        (c) =>
          c.id === categoryId 
      )

    return (
      category?.name ??
      "Sin categoría"
    )
  }

  if (loading) {
    return (
      <SafeAreaView
        style={styles.screen}
      >
        <View style={styles.centered}>
          <ActivityIndicator
            size="large"
          />
        </View>
      </SafeAreaView>
    )
  }

  if (error) {
    return (
      <SafeAreaView
        style={styles.screen}
      >
        <View style={styles.centered}>
          <Text>{error}</Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView
      style={styles.screen}
    >
      <View style={styles.header}>
        <Text style={styles.title}>
          Transacciones
        </Text>

        <TouchableOpacity
          onPress={() =>
            router.push(
              "/(tabs)/transactions/create"
            )
          }
        >
          <Text style={styles.add}>
            +
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={transactions}

        keyExtractor={(item) =>
          item.id
        }

        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push({
                pathname:
                  "/(tabs)/transactions/[id]",

                params: {
                  id: item.id,
                },
              })
            }
          >
            <View>
              <Text
                style={
                  styles.description
                }
              >
                {item.description}
              </Text>

              <Text
                style={styles.category}
              >
                {getCategoryName(
                  item.categoryId 
                )}
              </Text>
            </View>

            <Text
              style={[
                styles.amount,

                item.type ===
                "income"
                  ? styles.income
                  : styles.expense,
              ]}
            >
              $
              {item.amount}
            </Text>
          </TouchableOpacity>
        )}

        ListEmptyComponent={
          <View style={styles.centered}>
            <Text>
              No hay transacciones
            </Text>
          </View>
        }
      />
    </SafeAreaView>
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

  header: {
    flexDirection: "row",

    justifyContent:
      "space-between",

    alignItems: "center",

    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
  },

  add: {
    fontSize: 32,
    color: "#2563eb",
  },

  card: {
    flexDirection: "row",

    justifyContent:
      "space-between",

    alignItems: "center",

    padding: 16,

    borderBottomWidth: 1,

    borderColor: "#ddd",
  },

  description: {
    fontSize: 16,
    fontWeight: "600",
  },

  category: {
    color: "#666",
    marginTop: 4,
  },

  amount: {
    fontSize: 18,
    fontWeight: "bold",
  },

  income: {
    color: "green",
  },

  expense: {
    color: "red",
  },
})