import { Stack } from "expo-router";

export default function TVLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "TV Series" }} />
      <Stack.Screen name="[id]" options={{ title: "TV Details" }} />
    </Stack>
  );
}
