import React from "react";
import { Link } from "expo-router";
import { View, Text, Image, TouchableOpacity } from "react-native";

import { formatDate, imageParser } from "../../lib/utils";
import { imageURL, posterSize } from "../../api";
import NoImageIcon from "./NoImageIcon";

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
      className="mx-4 mt-6 flex w-[167] flex-col"
    >
      <TouchableOpacity>
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            className="mb-2 h-[250] w-full rounded-md"
            style={{ resizeMode: "cover" }}
          />
        ) : (
          <NoImageIcon styles="mb-2 h-[250] w-full rounded-md bg-primary" />
        )}
        <View className="flex flex-col gap-1">
          <Text className="text-base font-semibold">{title}</Text>
          <Text className=" text-xs text-gray-600">{formattedDate}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default CommonCard;
