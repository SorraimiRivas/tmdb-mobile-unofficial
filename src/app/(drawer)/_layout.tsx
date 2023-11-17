import { useAppSelector } from "@/hooks/useRedux";
import { imageParser } from "@/lib/utils";
import { DrawerItemList } from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { profileSize } from "@/api";
import Constants from "expo-constants";
import DrawerLoginButton from "@/components/common/DrawerLoginButton";
import DrawerLogoutButton from "@/components/common/DrawerLogoutButton";
import CountryFlag from "react-native-country-flag";
import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function Layout() {
  const { account, isLogged } = useAppSelector((state) => state.userSession);

  const avatar = account?.avatar?.tmdb.avatar_path;
  const avatarURL = imageParser(avatar, profileSize.original);

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
            {isLogged && (
              <View className="relative mb-4 h-32 w-full flex-row items-center justify-center">
                <Image
                  source={{ uri: avatarURL }}
                  className="h-32 w-32 rounded-full border-2 border-white"
                />
                <View className="absolute bottom-[50%] -z-10 h-0.5 w-full bg-white" />
              </View>
            )}
            <View className="mb-4 flex-row items-center justify-center px-2">
              <Text className="mr-2 text-xl font-bold text-white">
                {account?.name || account?.username}
              </Text>
              <CountryFlag isoCode={`${account?.iso_3166_1}`} size={14} />
            </View>
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
