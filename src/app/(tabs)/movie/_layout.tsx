import { Stack } from "expo-router";

export default function MoviesLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
        headerTintColor: "white",
        headerStyle: { backgroundColor: "#0d253f" },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Movies" }} />
      <Stack.Screen name="[id]" options={{ title: "Movie Details" }} />
    </Stack>
  );
}
