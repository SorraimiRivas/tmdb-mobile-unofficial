import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import {} from "react-native-gesture-handler";
import { Image } from "expo-image";
import { imageParser } from "@/lib/utils";
import { posterSize } from "@/api";
import { blurhash } from "@/lib/constants";

type KnownForCardProps = {
  title?: string | undefined;
  poster: string;
  id: number;
  media_type: "tv" | "movie";
  name?: string | undefined;
};

const KnownForCard = ({
  title,
  poster,
  id,
  media_type,
  name,
}: KnownForCardProps) => {
  const imageURL = imageParser(poster, posterSize.xl);

  console.log(id, media_type);

  return (
    <Link href={`/${media_type}/${id}`} asChild>
      <TouchableOpacity className="gap-4">
        <View className="shadow-sm shadow-primary">
          <Image
            source={{ uri: imageURL }}
            className="h-48 w-32 rounded-md"
            contentFit="cover"
            placeholder={blurhash}
          />
        </View>
        <View className="w-32">
          <Text className="font-bold">{title || name}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default KnownForCard;
