import { Link, Stack } from "expo-router";
import { Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function TVLayout() {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerTitleAlign: "center",
        headerTintColor: "white",
        animation: "slide_from_right",
        headerStyle: { backgroundColor: "#0d253f" },
        headerRight: () => (
          <Link href="/search" asChild>
            <Pressable>
              {({ pressed }) => (
                <MaterialIcons
                  name="search"
                  size={25}
                  color="white"
                  style={{
                    opacity: pressed ? 0.5 : 1,
                  }}
                />
              )}
            </Pressable>
          </Link>
        ),
      }}
    >
      <Stack.Screen name="index" options={{ title: "TV Series" }} />
      <Stack.Screen name="[id]" options={{ title: "TV Details" }} />
    </Stack>
  );
}
