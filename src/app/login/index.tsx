import { View, Text, Pressable, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Fold } from "react-native-animated-spinkit";
import { useLocalSearchParams, useRouter } from "expo-router";
import useLogin from "@/hooks/useLogin";
import { RequestToken } from "@/lib/types";

export default function login() {
  const [requestToken, setRequestToken] = useState<string>("");
  const { loading, loadingUserAccount, getRequestToken, getUserAccount } =
    useLogin();
  const router = useRouter();
  const { permission, validatedToken } = useLocalSearchParams();

  const handleLogin = async () => {
    const token = await getRequestToken();
    setRequestToken(token);
    router.push({ pathname: "/login/auth", params: { token } });
  };

  useEffect(() => {
    if (permission === "allow") {
      getUserAccount(validatedToken);
      router.replace("/(tabs)/movie");
    }
  }, []);
  return loading ? (
    <View className="flex-1 items-center justify-center">
      <Fold size={40} color="#01b4e4" />
    </View>
  ) : loadingUserAccount ? (
    <View className="flex-1 items-center justify-center">
      <Text>Signing In</Text>
      <Text>Please Wait</Text>
    </View>
  ) : (
    <View className="flex-1 items-center justify-center gap-10">
      <Pressable
        className="rounded-full bg-primary px-12 py-3"
        onPress={handleLogin}
      >
        <Text className="text-white ">Login</Text>
      </Pressable>

      <Pressable className="rounded-full bg-secondary px-10 py-3">
        <Text className="text-gray-100">Register</Text>
      </Pressable>
    </View>
  );
}
