import { View, Image } from "react-native";
import React from "react";

type BannerSectionProps = {
  backdropImageURL: string;
  posterURL: string;
};

const BannerSection = ({ backdropImageURL, posterURL }: BannerSectionProps) => {
  return (
    <View className="w-full h-80 bg-primary">
      <Image
        source={{ uri: backdropImageURL }}
        className="w-full h-80 absolute bg-primary"
        style={{ resizeMode: "cover" }}
      />
      <View className="w-32 h-48 mt-20 ml-4">
        <Image
          source={{ uri: posterURL }}
          className="w-32 h-48 rounded-md"
          style={{
            borderWidth: 0.5,
            borderColor: "white",
          }}
        />
      </View>
    </View>
  );
};

export default BannerSection;
