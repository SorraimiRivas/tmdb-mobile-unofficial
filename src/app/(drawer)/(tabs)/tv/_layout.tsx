import { DrawerToggleButton } from "@react-navigation/drawer";
import { Stack } from "expo-router";

export default function TVLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
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
