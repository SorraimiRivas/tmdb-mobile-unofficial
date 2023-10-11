import { View, Text, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";

import DotDivider from "./common/DotDivider";
import {
  AnimatedCircularProgress,
  CircularProgress,
} from "react-native-circular-progress";
import { convertToWholeNumber, getColorByRating } from "@/lib/utils";
import VerticalDivider from "./common/VerticalDivider";

type DetailsSectionProps = {
  title: string;
  releaseDate: string;
  genres: string;
  duration: string;
  overview: string;
  tagline: string;
  vote_average: number;
  trailerLink: string;
};

const DetailsSection = ({
  title,
  releaseDate,
  genres,
  duration,
  overview,
  tagline,
  vote_average,
  trailerLink,
}: DetailsSectionProps) => {
  const rating = convertToWholeNumber(vote_average);
  const ratingColor = getColorByRating(rating);

  console.log(trailerLink);

  const showVotes = () => {
    return (
      <View className="flex flex-row h-[60px] w-[60px] rounded-full items-center justify-center bg-[#081C22]">
        <Text className="text-white font-bold text-[20px]">{rating}</Text>
        <Text className="text-[8px] text-white font-bold">%</Text>
      </View>
    );
  };

  return (
    <View className="flex-1 mx-4 mb-6">
      <Text className="font-bold text-lg text-center mt-2">{title}</Text>
      <View className="flex-1 my-4 flex flex-row justify-around items-center">
        {/* Left */}
        <View className="flex-1 flex flex-row items-center">
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
          <Text className="font-bold text-sm ml-2">User Score</Text>
        </View>
        <VerticalDivider />
        {/* Right */}
        <Link
          href={`https://youtube.com/watch?v=${trailerLink}`}
          className="flex-1 flex flex-row items-center left-10"
          asChild
        >
          <Pressable>
            <MaterialIcons name="play-arrow" size={24} />
            <Text className="left-5">Play Trailer</Text>
          </Pressable>
        </Link>
      </View>
      <View className="bg-secondary/20 py-2 px-4 rounded-md">
        <View className="flex flex-row items-center justify-center">
          <Text className=" text-base">{releaseDate}</Text>
          <DotDivider />
          <Text className=" text-base">{duration}</Text>
          <View className="bg-white" />
        </View>
        <Text className=" text-sm text-center">{genres}</Text>
      </View>
      {tagline && (
        <Text className="text-base font-light italic mt-4">{tagline}</Text>
      )}
      <Text className="text-lg font-bold mt-4">Overview</Text>
      <Text className="text-base mt-2 text-left">{overview}</Text>
    </View>
  );
};

export default DetailsSection;
