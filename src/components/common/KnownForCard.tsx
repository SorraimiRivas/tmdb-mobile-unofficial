import React from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import { Link } from "expo-router";
import { Image } from "expo-image";
import { imageParser } from "@/lib/utils";
import { posterSize } from "@/api";
import { blurhash } from "@/lib/constants";
import { styled } from "nativewind";

type KnownForCardProps = {
  title?: string | undefined;
  poster: string;
  id: number;
  media_type: "tv" | "movie";
  name?: string | undefined;
};

const StyledView = styled(View);

const KnownForCard = ({
  title,
  poster,
  id,
  media_type,
  name,
}: KnownForCardProps) => {
  const imageURL = imageParser(poster, posterSize.xl);

  return (
    <Link href={`/${media_type}/${id}`} asChild>
      <TouchableOpacity className="gap-4">
        <StyledView
          className={`${
            Platform.OS === "ios" ? "shadow-sm" : "shadow-md"
          } overflow-clip rounded-md bg-primary  shadow-black`}
        >
          <Image
            source={{ uri: imageURL }}
            className="h-48 w-32 rounded-md"
            contentFit="cover"
            placeholder={blurhash}
          />
        </StyledView>
        <View className="w-32">
          <Text className="font-bold">{title || name}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default KnownForCard;
