import React from "react";
import { Link } from "expo-router";
import { View, Text, Image, TouchableOpacity } from "react-native";

import { formatDate, imageParser } from "../../lib/utils";
import { posterSize } from "../../api";

type CommonMovieCardProps = {
  title: string;
  poster: string;
  releaseDate?: string;
  id: number;
};

type CommonSeriesCardProps = {
  firstAirDate?: string;
};

type CommonCardProps = CommonMovieCardProps &
  CommonSeriesCardProps & { type: "tv" | "movie" };

const CommonCard = ({
  title,
  poster,
  releaseDate,
  firstAirDate,
  id,
  type,
}: CommonCardProps) => {
  const imageUrl = imageParser(poster, posterSize.xxl);
  const formattedDate = formatDate(releaseDate! || firstAirDate!);
  return (
    <Link
      href={`/${type}/${id}`}
      asChild
      className="w-[167] flex flex-col mx-4 mt-6"
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
