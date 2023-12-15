import React from "react";
import { View, Text, Pressable } from "react-native";
import { Image } from "expo-image";

import { getInitials, imageParser } from "@/lib/utils";
import { profileSize } from "@/api";
import { blurhash } from "@/lib/constants";
import { Link } from "expo-router";

type CastCardProps = {
  name: string;
  profile_path?: string;
  character?: string;
  id: number;
};
const CastCard = ({ name, profile_path, character, id }: CastCardProps) => {
  const profileURL = imageParser(profile_path, profileSize.original);
  const initials = getInitials(name);

  return (
    <Link href={`/person/${id}`} className="w-32" asChild>
      <Pressable className="w-32">
        {profileURL ? (
          <Image
            source={{ uri: profileURL }}
            className="h-44 w-32 rounded-md"
            contentFit="cover"
            placeholder={blurhash}
            transition={1000}
          />
        ) : (
          <View className="h-44 w-32 items-center justify-center rounded-md bg-tertiary">
            <Text className="text-4xl font-bold text-gray-600">{initials}</Text>
          </View>
        )}
        <View className="mt-1 flex flex-col ">
          <Text className="font-bold" ellipsizeMode="tail" numberOfLines={2}>
            {name}
          </Text>
          <Text className="text-gray-600">{character}</Text>
        </View>
      </Pressable>
    </Link>
  );
};

export default CastCard;
