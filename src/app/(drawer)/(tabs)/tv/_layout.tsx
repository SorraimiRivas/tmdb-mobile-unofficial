import { Stack } from "expo-router";

import { DrawerToggleButton } from "@react-navigation/drawer";

export default function TVLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
        headerTintColor: "white",
        animation: "slide_from_right",
        headerStyle: { backgroundColor: "#0d253f" },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "TV Series",
          headerLeft: () => (
            <DrawerToggleButton
              tintColor="white"
              pressOpacity={0.5}
              pressColor="gray"
            />
          ),
        }}
      />
      <Stack.Screen name="[id]" options={{ title: "TV Details" }} />
    </Stack>
  );
}
