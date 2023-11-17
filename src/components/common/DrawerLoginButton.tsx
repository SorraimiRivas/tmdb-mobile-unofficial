import { View, Text, Pressable } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { Octicons } from "@expo/vector-icons";

const DrawerLoginButton = () => {
  return (
    <Link href="/login/" asChild>
      <Pressable className="absolute bottom-5 ml-4 mt-4 flex-row items-center">
        <Octicons name="sign-in" size={25} color="white" />
        <Text className="bottom-0 ml-4 text-base font-bold text-white">
          Login
        </Text>
      </Pressable>
    </Link>
  );
};

export default DrawerLoginButton;
