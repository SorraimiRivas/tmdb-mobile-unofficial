import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const PeopleLayout = () => {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#0d253f" },
          headerBackTitleVisible: true,
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen name="index" options={{ title: "People" }} />
        <Stack.Screen name="[id]" options={{ title: "" }} />
      </Stack>
    </>
  );
};

export default PeopleLayout;
