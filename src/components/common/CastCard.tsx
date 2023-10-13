import { View, Text, Image, Platform, StyleSheet } from "react-native";
import React from "react";
import { imageParser } from "@/lib/utils";
import { profileSize } from "@/api";

type CastCardProps = {
  name: string;
  profile_path?: string;
  character?: string;
};
const CastCard = ({ name, profile_path, character }: CastCardProps) => {
  const profileURL = imageParser(profile_path, profileSize.original);

  return Platform.OS === "ios" ? (
    <View className="my-4 items-center">
      <Image
        source={{ uri: profileURL }}
        className="h-32 w-[85px] rounded-lg"
        style={{ resizeMode: "contain" }}
      />
      <View className="flex flex-col mt-1 w-32">
        <Text
          className="text-center font-bold"
          ellipsizeMode="tail"
          numberOfLines={2}
        >
          {name}
        </Text>
        <Text
          className="text-center text-gray-600"
          ellipsizeMode="tail"
          numberOfLines={2}
        >
          {character}
        </Text>
      </View>
    </View>
  ) : (
    <View className="mx-2">
      <Image
        source={{ uri: profileURL }}
        className="h-44 w-44 rounded-full "
        style={{ resizeMode: "contain" }}
      />
      <View className="flex flex-col mt-1 ">
        <Text
          className="text-center font-bold"
          ellipsizeMode="tail"
          numberOfLines={2}
        >
          {name}
        </Text>
        <Text
          className="text-center text-gray-600"
          ellipsizeMode="tail"
          numberOfLines={2}
        >
          {character}
        </Text>
      </View>
    </View>
  );
};

export default CastCard;
