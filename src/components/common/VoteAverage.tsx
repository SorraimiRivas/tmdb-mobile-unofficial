import { View, Text } from "react-native";
import React from "react";
import { AnimatedCircularProgress } from "react-native-circular-progress";

type VoteAverageProps = {
  ratingColor: string;
  rating: number;
};

const VoteAverage = ({ ratingColor, rating }: VoteAverageProps) => {
  const showVotes = () => {
    return (
      <View className="flex flex-row h-[60px] w-[60px] rounded-full items-center justify-center bg-[#081C22]">
        <Text className="text-white font-bold text-[20px]">{rating}</Text>
        <Text className="text-[8px] text-white font-bold">%</Text>
      </View>
    );
  };

  return (
    <AnimatedCircularProgress
      size={60}
      width={5}
      tintColor={ratingColor}
      backgroundColor="#0d253f"
      fill={rating}
      children={showVotes}
      rotation={0}
      lineCap="round"
    />
  );
};

export default VoteAverage;
