import { View, Text, SafeAreaView } from "react-native";
import { useEffect, useState } from "react";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Fold } from "react-native-animated-spinkit";

import useLogin from "@/hooks/useLogin";
import CustomButton from "@/components/common/CustomButton";

export default function login() {
  const { loading, loadingUserAccount, getRequestToken, getUserAccount } =
    useLogin();
  const router = useRouter();
  const { permission, validatedToken } = useLocalSearchParams();

  const handleLogin = async () => {
    const token = await getRequestToken();
    router.push({ pathname: "/login/sign-in", params: { token } });
  };
  const handleExplore = () => {
    router.replace("/(drawer)/(tabs)/movie");
  };
  useEffect(() => {
    if (permission === "allow") {
      getUserAccount(validatedToken);
      router.replace("/(drawer)/(tabs)/movie/");
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
    <SafeAreaView className="relative top-10 flex flex-1 flex-col items-center gap-4">
      <Text className="absolute top-10 text-4xl font-bold">Welcome to</Text>
      <Image
        source={require("src/assets/tmdblogo.svg")}
        className="h-72 w-72"
        contentFit="contain"
      />
      <Text className="-top-10 px-10 text-center text-xl">
        Enjoy exploring your favorite movies, TV shows, and celebrities.
      </Text>

      <View className="flex-1 flex-col gap-4">
        <CustomButton
          label="Sign In"
          buttonStyle="flex bg-primary w-72 px-4 py-2 rounded-full"
          labelStyle="font-bold text-base text-center text-white"
          onPress={handleLogin}
        />
        <Text className="mb-4 text-center text-base">
          Don't have an account?
        </Text>
        <CustomButton
          label="Sign Up"
          buttonStyle="bg-secondary w-72 px-4 py-2 rounded-full"
          labelStyle="font-bold text-base text-center"
        />
        <Text className="mb-4 text-center text-base">Or</Text>
        <CustomButton
          label="Explore"
          buttonStyle="bg-tertiary w-72 px-4 py-2 rounded-full"
          labelStyle="font-bold text-base text-center"
          onPress={handleExplore}
        />
        <Text className="text-center text-base">It's FREE</Text>
      </View>
    </SafeAreaView>
  );
}
