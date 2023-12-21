import { Image } from "expo-image";
import { Link } from "expo-router";
import React from "react";
import { View, Text, Platform, Pressable } from "react-native";

import NoImageIcon from "./NoImageIcon";
import { posterSize } from "../../api";
import { formatDate, imageParser } from "../../lib/utils";

import { blurhash } from "@/lib/constants";
import { styled } from "nativewind";

type CommonMovieCardProps = {
  title?: string;
  poster?: string;
  releaseDate?: string;
  id: number;
};

type CommonSeriesCardProps = {
  firstAirDate?: string;
};

type CommonPersonCardProps = {
  name?: string;
  profilePath?: string;
};

const StyledView = styled(View);

type CommonCardProps = CommonMovieCardProps &
  CommonSeriesCardProps &
  CommonPersonCardProps & { type: "tv" | "movie" | "person" };

const CommonCard = ({
  title,
  type,
  poster,
  releaseDate,
  firstAirDate,
  id,
  name,
  profilePath,
}: CommonCardProps) => {
  const imageURL = imageParser(poster || profilePath, posterSize.xxl);
  const formattedDate = formatDate(releaseDate! || firstAirDate!);

  return (
    <Link
      href={`/${type}/${id}`}
      asChild
      className="mb-4 mt-6 flex w-[167] flex-col"
    >
      <Pressable>
        {imageURL ? (
          <StyledView
            className={`${
              Platform.OS === "ios" ? "shadow-sm" : "shadow-xl"
            } mb-3 h-[250] overflow-clip  rounded-md bg-primary shadow-black`}
          >
            <Image
              source={{ uri: imageURL }}
              className="mb-2 h-[250] w-full rounded-md"
              contentFit="cover"
              placeholder={blurhash}
              transition={1000}
            />
          </StyledView>
        ) : (
          <NoImageIcon styles="h-[250] w-full rounded-md bg-primary" />
        )}
        <View className="mt-2 flex flex-col gap-1">
          <Text numberOfLines={2} className="text-base font-semibold">
            {title || name}
          </Text>
          {/* TODO: use better validation */}

          {formattedDate !== "n/a" ? (
            <Text className=" text-xs text-gray-600">{formattedDate}</Text>
          ) : null}
        </View>
      </Pressable>
    </Link>
  );
};

export default CommonCard;
