import { Stack } from "expo-router";
import { setStatusBarStyle } from "expo-status-bar";

const PeopleLayout = () => {
  setStatusBarStyle("light");
  return (
    <>
      <Stack
        screenOptions={{
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#0d253f" },
          headerBackTitleVisible: true,
          headerTitleAlign: "center",
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="index" options={{ title: "People" }} />
        <Stack.Screen name="[id]" options={{ title: "" }} />
      </Stack>
    </>
  );
};

export default PeopleLayout;
