import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { Image } from "expo-image";

import { formatDate, imageParser } from "../../lib/utils";
import { posterSize } from "../../api";
import NoImageIcon from "./NoImageIcon";
import { blurhash } from "@/lib/constants";

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
  const imageURL = imageParser(poster, posterSize.xxl);
  const formattedDate = formatDate(releaseDate! || firstAirDate!);
  return (
    <Link
      href={`/${type}/${id}`}
      asChild
      className="mt-6 flex w-[167] flex-col"
    >
      <TouchableOpacity>
        {imageURL ? (
          <Image
            source={{ uri: imageURL }}
            className="mb-2 h-[250] w-full rounded-md"
            contentFit="contain"
            placeholder={blurhash}
            transition={1000}
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
