import { Stack } from "expo-router";

export default function MoviesLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Movies" }} />
      <Stack.Screen name="[id]" options={{ title: "Details" }} />
    </Stack>
  );
}
