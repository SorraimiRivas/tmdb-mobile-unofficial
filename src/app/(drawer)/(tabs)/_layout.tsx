import { Platform, Pressable, View } from "react-native";
import { setStatusBarStyle } from "expo-status-bar";
import { Tabs, useRouter } from "expo-router";

import { MaterialIcons } from "@expo/vector-icons";

import HeaderProfileButton from "@/components/common/HeaderProfileButton";
import { useAppSelector } from "@/hooks/useRedux";
import { imageParser } from "@/lib/utils";
import { profileSize } from "@/api";
import { DrawerToggleButton } from "@react-navigation/drawer";

setStatusBarStyle("light");

export default function TabsLayout() {
  const router = useRouter();
  const { account, isLogged } = useAppSelector((state) => state.userSession);
  const avatar = account?.avatar?.gravatar;
  const profileImage = imageParser(
    account?.avatar?.tmdb.avatar_path,
    profileSize.original,
  );
import React from "react";
import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { setStatusBarStyle } from "expo-status-bar";

export default function TabsLayout() {
  setStatusBarStyle("light");

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: "#0d253f", height: 110 },
        headerShadowVisible: false,
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
        headerLeft: () =>
          router.canGoBack() ? (
            <Pressable onPress={() => router.back()} className="mx-4">
              <MaterialIcons name="arrow-back-ios" size={25} color="white" />
            </Pressable>
          ) : (
            <DrawerToggleButton pressOpacity={0.5} tintColor="white" />
          ),
        headerRight: () => (
          <View className="flex flex-row items-center gap-2 rounded-full">
            <HeaderProfileButton
              image={profileImage}
              isAuth={isLogged}
              username={account?.name!}
              userEmail={account?.username!}
              avatar={avatar!}
            />
            <Pressable className="mx-4">
              {({ pressed }) => (
                <MaterialIcons
                  name="search"
                  size={30}
                  color="#01b4e4"
                  style={{ opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </View>
        ),
        headerStyle: { backgroundColor: "#0d253f" },
        headerTintColor: "white",
        headerTitleAlign: "center",

      }}
    >
      <Tabs.Screen
        name="movie"
        options={{
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
