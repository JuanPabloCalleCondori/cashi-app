import {
  StyleSheet,
  Text,
  View,
} from "react-native"

import {
  SafeAreaView,
} from "react-native-safe-area-context"

import {
  useTransactions,
} from "../../hooks/useTransactions"

import { useFocusEffect } from "@react-navigation/native"
import { useCallback } from "react"

export default function BalanceScreen() {
const {
  totalIncome,
  totalExpense,
  balance,
  recargar,
} = useTransactions()

useFocusEffect(
  useCallback(() => {
    void recargar()
  }, [recargar])
)

  return (
    <SafeAreaView
      style={styles.screen}
    >
      <View style={styles.container}>
        <Text style={styles.title}>
          Balance
        </Text>

        <View style={styles.card}>
          <Text style={styles.label}>
            Ingresos
          </Text>

          <Text style={styles.income}>
            ${totalIncome}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>
            Egresos
          </Text>

          <Text style={styles.expense}>
            ${totalExpense}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>
            Balance total
          </Text>

          <Text style={styles.balance}>
            ${balance}
          </Text>
        </View>
      </View>
    </SafeAreaView>
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
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 24,
  },

  card: {
    padding: 20,

    borderRadius: 12,

    backgroundColor: "#f3f4f6",

    marginBottom: 16,
  },

  label: {
    fontSize: 18,

    marginBottom: 8,
  },

  income: {
    fontSize: 28,

    fontWeight: "bold",

    color: "#16a34a",
  },

  expense: {
    fontSize: 28,

    fontWeight: "bold",

    color: "#dc2626",
  },

  balance: {
    fontSize: 32,

    fontWeight: "bold",
  },
})
