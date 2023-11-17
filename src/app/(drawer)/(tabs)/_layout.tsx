import React from "react";
import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { setStatusBarStyle } from "expo-status-bar";

export default function TabsLayout() {
  setStatusBarStyle("light");

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: "#0d253f" },
        headerTintColor: "white",
        headerTitleAlign: "center",
      }}
    >
      <Tabs.Screen
        name="movie"
        options={{
          headerShown: false,
          title: "Movies",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="movie" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="tv"
        options={{
          headerShown: false,
          title: "TV Series",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="tv" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="person"
        options={{
          headerShown: false,
          title: "People",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="people" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
