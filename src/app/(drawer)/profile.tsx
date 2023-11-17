import { View, Text } from "react-native";
import React from "react";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { useAppSelector } from "@/hooks/useRedux";
import { imageParser } from "@/lib/utils";
import { profileSize } from "@/api";
import { Image } from "expo-image";
import CountryFlag from "react-native-country-flag";

const Profile = () => {
  const { account } = useAppSelector((state) => state.userSession);
  const avatar = account?.avatar?.tmdb.avatar_path;
  const avatarURL = imageParser(avatar, profileSize.original);

  return (
    <View>
      <View className="relative h-20 bg-primary">
        <View className="top-[50%]">
          <DrawerToggleButton tintColor="white" />
        </View>
      </View>
      <View className="mt-4 items-center">
        <Image
          source={{ uri: avatarURL }}
          className="h-40 w-40 rounded-full "
        />
      </View>
      <View className="mt-4 items-center">
        <Text className="mb-4 text-xl font-bold">
          {account?.name || account?.username}
        </Text>
        <CountryFlag isoCode={account?.iso_3166_1!} size={40} />
      </View>
    </View>
  );
};

export default Profile;
