import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { TMovies } from "../../lib/types";
import { imageParser } from "../../lib/utils";
import { poster } from "../../api";
import { Link } from "expo-router";

type CommonCardProps = TMovies;

const CommonCard = ({
  title,
  overview,
  poster_path,
  release_date,
  id,
}: CommonCardProps) => {
  const imageUrl = imageParser(poster_path, poster.xl);
  console.log(imageUrl);

  return (
    <Link
      href={`/movie/${id}`}
      asChild
      className="h-[342] w-[192] flex flex-col mx-2 mt-4 bg-gray-200 rounded-b-lg"
    >
      <Pressable>
        <Image
          source={{ uri: imageUrl }}
          className="h-[80%] w-full mb-4 rounded-t-lg"
        />
        <View className="flex flex-col gap-2 px-2">
          <Text className="font-semibold">{title}</Text>
          <Text className="font-semibold text-gray-400">{release_date}</Text>
        </View>
      </Pressable>
    </Link>
  );
};

export default CommonCard;
