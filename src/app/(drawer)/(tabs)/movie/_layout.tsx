import { Stack } from "expo-router";

export default function MoviesLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerTitleAlign: "center",
        headerTintColor: "white",
        headerStyle: { backgroundColor: "#0d253f" },
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Movies",
        }}
      />
      <Stack.Screen name="[id]" options={{ title: "Movie Details" }} />
    </Stack>
  );
}
