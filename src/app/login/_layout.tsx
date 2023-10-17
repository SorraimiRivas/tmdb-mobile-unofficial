import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Login" }} />
      <Stack.Screen name="auth" options={{ title: "Authentication" }} />
    </Stack>
  );
};

export default _layout;
