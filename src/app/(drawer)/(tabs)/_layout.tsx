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
        tabBarInactiveTintColor: "rgba(255, 255, 255, 0.5)",
        tabBarActiveTintColor: "white",
        tabBarStyle: {
          backgroundColor: "#0d253f",
          height: 70,
          borderRadius: 100,
          position: "absolute",
          marginBottom: 16,
          marginHorizontal: 10,
        },
        tabBarLabelStyle: {
          ...Platform.select({
            android: {
              marginBottom: 10,
            },
            ios: {
              height: 15,
              top: 5,
            },
          }),
          fontSize: 13,
          fontWeight: "600",
        },
        tabBarItemStyle: {
          ...Platform.select({
            ios: {
              top: 10,
            },
          }),
        },
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
              size={28}
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
              size={28}
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
              size={28}
              style={{ opacity: focused ? 1 : 0.5 }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
