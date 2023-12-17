import { SafeAreaView } from "react-native-safe-area-context";
import { DrawerItemList } from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";
import Constants from "expo-constants";

import { MaterialIcons } from "@expo/vector-icons";

import DrawerLogoutButton from "@/components/common/DrawerLogoutButton";
import DrawerLoginButton from "@/components/common/DrawerLoginButton";
import { useAppSelector } from "@/hooks/useRedux";


export default function Layout() {
  const { account, isLogged } = useAppSelector((state) => state.userSession);

  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        swipeEnabled: true,
        swipeEdgeWidth: 0,
        drawerActiveTintColor: "white",
        drawerInactiveTintColor: "#01b4e4",
        drawerActiveBackgroundColor: "#01b4e4",
        drawerStatusBarAnimation: "slide",
        drawerStyle: { backgroundColor: "#0d253f" },
        drawerLabelStyle: {
          fontSize: 16,
          marginLeft: -18,
        },
      }}
      drawerContent={(props) => {
        return (
          <SafeAreaView
            style={{ paddingTop: Constants.statusBarHeight }}
            className="flex-1"
          >
            <DrawerItemList {...props} />
            {!isLogged ? <DrawerLoginButton /> : <DrawerLogoutButton />}
          </SafeAreaView>
        );
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: "Home",
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="movie" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          title: "Profile",
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="person" color={color} size={size} />
          ),
        }}
      />
    </Drawer>
  );
}
