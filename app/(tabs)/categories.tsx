import {
  useFocusEffect,
} from "@react-navigation/native"

import { router } from "expo-router"

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
  useCategories,
} from "../../hooks/useCategories"

export default function CategoriesScreen() {
  const {
    categories,
    loading,
    error,
    recargar,
  } = useCategories()

  useFocusEffect(
    useCallback(() => {
      void recargar()
    }, [recargar])
  )

  if (loading) {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" />
        </View>
      </SafeAreaView>
    )
  }

  if (error) {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.centered}>
          <Text style={styles.error}>
            {error}
          </Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Categorías
        </Text>

        <TouchableOpacity
          onPress={() =>
            router.push(
              "/(tabs)/categories/create"
            )
          }
        >
          <Text style={styles.add}>
            +
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push({
                pathname:
                  "/(tabs)/categories/[id]",
                params: {
                  id: item.id,
                },
              })
            }
          >
            <Text style={styles.cardText}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.centered}>
            <Text>
              No hay categorías
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
    justifyContent: "space-between",
    alignItems: "center",

    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
  },

  add: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2563eb",
  },

  card: {
    backgroundColor: "#f3f4f6",

    padding: 16,

    marginHorizontal: 20,
    marginBottom: 12,

    borderRadius: 10,
  },

  cardText: {
    fontSize: 16,
  },

  error: {
    color: "red",
  },
})
