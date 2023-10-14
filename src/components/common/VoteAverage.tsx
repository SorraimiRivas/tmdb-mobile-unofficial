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
      <View className="flex h-[70px] w-[70px] flex-row items-center justify-center rounded-full bg-[#081C22]">
        {rating ? (
          <>
            <Text className="text-[20px] font-bold text-white">{rating}</Text>
            <Text className="text-[8px] font-bold text-white">%</Text>
          </>
        ) : (
          <Text className="text-xl font-bold text-white">NR</Text>
        )}
      </View>
    );
  };

  return (
    <AnimatedCircularProgress
      size={60}
      width={7}
      tintColor={ratingColor}
      backgroundColor="gray"
      backgroundWidth={8}
      padding={3}
      fill={rating}
      children={showVotes}
      rotation={0}
      lineCap="round"
      duration={1000}
      style={{ backgroundColor: "#081C22", borderRadius: 9999 }}
    />
  );
};

export default VoteAverage;
