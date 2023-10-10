import { View, Text, Image } from "react-native";
import React from "react";
import { IMovies, ISeries } from "../../lib/types";
import { formatDate, imageParser } from "../../lib/utils";
import { posterSize } from "../../api";
import { Link } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";

type CommonCardProps = (IMovies | ISeries) & { type: "movie" | "tv" };

const CommonCard = ({
  title,
  poster,
  releaseDate,
  id,
  type,
}: CommonCardProps) => {
  const imageUrl = imageParser(poster, posterSize.xxl);
  const formattedDate = formatDate(releaseDate!);
  return (
    <Link
      href={`/${type}/${id}`}
      asChild
      className="w-[167] flex flex-col mx-2 mt-6"
    >
      <TouchableOpacity>
        <Image
          source={{ uri: imageUrl }}
          className="h-[250] w-full mb-2 rounded-md"
          style={{ resizeMode: "cover" }}
        />
        <View className="flex flex-col gap-1">
          <Text className="font-semibold text-base">{title}</Text>
          <Text className=" text-gray-600 text-xs">{formattedDate}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default CommonCard;
