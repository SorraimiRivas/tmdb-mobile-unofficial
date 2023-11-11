import { Drawer } from "expo-router/drawer";
import { Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { DrawerToggleButton } from "@react-navigation/drawer";

export default function Layout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        swipeEnabled: true,
        swipeEdgeWidth: 5,
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: "Movies & TV Series",
        }}
      />
    </Drawer>
  );
}
