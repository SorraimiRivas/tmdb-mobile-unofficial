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
      <View className="flex flex-row h-[70px] w-[70px] rounded-full items-center justify-center bg-[#081C22]">
        {rating ? (
          <>
            <Text className="text-white font-bold text-[20px]">{rating}</Text>
            <Text className="text-[8px] text-white font-bold">%</Text>
          </>
        ) : (
          <Text className="text-white font-bold text-xl">NR</Text>
        )}
      </View>
    );
  };

  return (
    <AnimatedCircularProgress
      size={60}
      width={5}
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
