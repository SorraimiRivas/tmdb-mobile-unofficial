import { Stack } from "expo-router";

const PeopleLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "People" }} />
      <Stack.Screen name="[id]" options={{ title: "Details" }} />
    </Stack>
  );
};

export default PeopleLayout;
