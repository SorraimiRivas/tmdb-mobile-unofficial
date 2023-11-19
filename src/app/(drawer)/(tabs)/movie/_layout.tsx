import { DrawerToggleButton } from "@react-navigation/drawer";
import { Stack } from "expo-router";

export default function MoviesLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
        headerTintColor: "white",
        headerStyle: { backgroundColor: "#0d253f" },
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Movies",
          headerLeft: () => (
            <DrawerToggleButton
              tintColor="white"
              pressOpacity={0.5}
              pressColor="gray"
            />
          ),
        }}
      />
      <Stack.Screen name="[id]" options={{ title: "Movie Details" }} />
    </Stack>
  );
}
