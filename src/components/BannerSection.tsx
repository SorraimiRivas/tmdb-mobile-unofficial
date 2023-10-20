import React from "react";
import { View } from "react-native";
import { Image } from "expo-image";

import NoImageIcon from "./common/NoImageIcon";
import { blurhash } from "@/lib/constants";

type BannerSectionProps = {
  backdropImageURL: string | null;
  posterURL: string | null;
};

const BannerSection = ({ backdropImageURL, posterURL }: BannerSectionProps) => {
  return (
    <View className="h-80 w-full">
      {backdropImageURL ? (
        <Image
          source={{ uri: backdropImageURL }}
          className="absolute h-80 w-full"
          contentFit="cover"
          placeholder={blurhash}
          transition={1000}
        />
      ) : (
        <NoImageIcon styles="w-full h-80 absolute" />
      )}
      <View
        className="ml-4 mt-20 h-48 w-32 overflow-hidden rounded-md"
        style={{
          borderWidth: 0.5,
          borderColor: "white",
        }}
      >
        {posterURL ? (
          <Image
            source={{ uri: posterURL }}
            className="h-48 w-32"
            placeholder={blurhash}
            transition={1000}
          />
        ) : null}
      </View>
    </View>
  );
};

export default BannerSection;
