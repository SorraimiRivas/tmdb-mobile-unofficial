import { View, Image } from "react-native";
import React from "react";

type BannerSectionProps = {
  backdropImageURL: string;
  posterURL: string;
};

const BannerSection = ({ backdropImageURL, posterURL }: BannerSectionProps) => {
  return (
    <View className="w-full h-80">
      <Image
        source={{ uri: backdropImageURL }}
        className="w-full h-80 absolute"
        style={{ resizeMode: "cover" }}
      />
      <View
        className="w-32 h-48 mt-20 ml-4 rounded-md overflow-hidden"
        style={{
          borderWidth: 0.5,
          borderColor: "white",
        }}
      >
        <Image source={{ uri: posterURL }} className="w-32 h-48" />
      </View>
    </View>
  );
};

export default BannerSection;
