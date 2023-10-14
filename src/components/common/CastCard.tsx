import { View, Text, Image } from "react-native";
import React from "react";
import { getInitials, imageParser } from "@/lib/utils";
import { profileSize } from "@/api";

type CastCardProps = {
  name: string;
  profile_path?: string;
  character?: string;
};
const CastCard = ({ name, profile_path, character }: CastCardProps) => {
  const profileURL = imageParser(profile_path, profileSize.original);
  const initials = getInitials(name);

  return (
    <View className="w-44">
      {profileURL ? (
        <Image
          source={{ uri: profileURL }}
          className="h-44 w-44 rounded-full "
          style={{ resizeMode: "cover" }}
        />
      ) : (
        <View className="h-44 w-44 items-center justify-center rounded-full bg-tertiary">
          <Text className="text-6xl font-bold text-gray-600">{initials}</Text>
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
