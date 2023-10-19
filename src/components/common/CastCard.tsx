import React from "react";
import { View, Text } from "react-native";
import { Image } from "expo-image";

import { getInitials, imageParser } from "@/lib/utils";
import { profileSize } from "@/api";
import { blurhash } from "@/lib/constants";

type CastCardProps = {
  name: string;
  profile_path?: string;
  character?: string;
};
const CastCard = ({ name, profile_path, character }: CastCardProps) => {
  const profileURL = imageParser(profile_path, profileSize.original);
  const initials = getInitials(name);

  return (
    <View className="w-32">
      {profileURL ? (
        <Image
          source={{ uri: profileURL }}
          className="h-32 w-32 rounded-full "
          contentFit="cover"
          placeholder={blurhash}
          transition={1000}
        />
      ) : (
        <View className="h-32 w-32 items-center justify-center rounded-full bg-tertiary">
          <Text className="text-4xl font-bold text-gray-600">{initials}</Text>
        </View>
      )}
      <View className="mt-1 flex flex-col ">
        <Text
          className="text-center font-bold"
          ellipsizeMode="tail"
          numberOfLines={2}
        >
          {name}
        </Text>
        <Text className="text-center text-gray-600">{character}</Text>
      </View>
    </View>
  );
};

export default CastCard;
