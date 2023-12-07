import React from "react";
import { Platform } from "react-native";
import { Tabs } from "expo-router";
import { setStatusBarStyle } from "expo-status-bar";

import { MaterialIcons } from "@expo/vector-icons";

export default function TabsLayout() {
  setStatusBarStyle("light");

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: "#0d253f" },
        headerTintColor: "white",
        headerTitleAlign: "center",
        tabBarInactiveTintColor: "#e5e7eb",
        tabBarActiveTintColor: "white",
        tabBarLabelStyle: { fontSize: 14, fontWeight: "600" },
        tabBarStyle: {
          backgroundColor: "#0d253f",
          height: 70,
          borderRadius: 100,
          position: "absolute",
          marginBottom: 16,
          marginHorizontal: 10,
        },
        tabBarItemStyle: {
          ...Platform.select({
            ios: {
              top: 14,
            },
          }),
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="movie"
        options={{
          headerShown: false,
          title: "Movies",
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons
              name="movie"
              color={color}
              size={35}
              style={{ opacity: focused ? 1 : 0.5 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="tv"
        options={{
          headerShown: false,
          title: "TV Series",
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons
              name="live-tv"
              color={color}
              size={35}
              style={{ opacity: focused ? 1 : 0.5 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="person"
        options={{
          headerShown: false,
          title: "People",
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons
              name="people"
              color={color}
              size={35}
              style={{ opacity: focused ? 1 : 0.5 }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
