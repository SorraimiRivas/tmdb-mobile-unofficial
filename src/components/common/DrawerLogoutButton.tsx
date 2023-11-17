import { Text, Pressable, Alert } from "react-native";
import React from "react";
import { Octicons } from "@expo/vector-icons";
import { useAppDispatch } from "@/hooks/useRedux";
import { logout } from "@/redux/sessionSlice";

const DrawerLogoutButton = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    Alert.alert(
      "Log-out",
      "Are you sure you want to log out? If you log out you wont have access to most features.",
      [
        { text: "Cancel", style: "destructive" },
        {
          text: "Logut",
          onPress: () => dispatch(logout()),
          style: "default",
        },
      ],
    );
  };

  return (
    <Pressable
      className="absolute bottom-5 ml-4 mt-4 flex-row items-center"
      onPress={handleLogout}
    >
      <Octicons name="sign-out" size={25} color="white" />
      <Text className="bottom-0 ml-4 text-base font-bold text-white">
        Logout
      </Text>
    </Pressable>
  );
};

export default DrawerLogoutButton;
