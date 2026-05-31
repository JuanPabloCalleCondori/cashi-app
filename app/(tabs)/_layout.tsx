import { Tabs } from "expo-router";

import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      {/* PRINCIPALES */}

      <Tabs.Screen
        name="index"
        options={{
          title: "Transacciones",
          tabBarIcon: ({ color }) => (
            <FontAwesome
              name="list"
              size={20}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="balance"
        options={{
          title: "Balance",
          tabBarIcon: ({ color }) => (
            <FontAwesome
              name="money"
              size={20}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="categories"
        options={{
        href: "/categories",
        title: "Categorías",

        tabBarIcon: ({ color }) => (
       <FontAwesome
          name="tags"
          size={20}
          color={color}
          />
       ),
        }}
      />

      {/* OCULTAS */}

      <Tabs.Screen
        name="categories/create"
        options={{
          href: null,
        }}
      />


      <Tabs.Screen
        name="categories/[id]/index"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="categories/[id]/edit"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="transactions/create"
        options={{
          href: null,
        }}
      />


      <Tabs.Screen
        name="transactions/[id]/index"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="transactions/[id]/edit"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}