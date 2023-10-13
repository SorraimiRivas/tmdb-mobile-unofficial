import { View, Text, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import DotDivider from "./common/DotDivider";
import { convertToWholeNumber, getColorByRating } from "@/lib/utils";
import VerticalDivider from "./common/VerticalDivider";
import VoteAverage from "./common/VoteAverage";
import Popover from "./common/TrailersPopOver";
import { TrailerVideos } from "@/lib/types";

type MovieDetailsProps = {
  title: string;
  releaseDate?: string;
  firstAirDate?: string;
  genres: string;
  duration?: string;
  overview: string;
  tagline: string;
  voteAverage: number;
  trailers: TrailerVideos[];
};

type SeriesDetailsProps = {
  firstAirDate?: string;
};

type CombinedDetailsProps = MovieDetailsProps & SeriesDetailsProps;

const DetailsSection = ({
  title,
  releaseDate,
  firstAirDate,
  genres,
  duration,
  overview,
  tagline,
  voteAverage,
  trailers,
}: CombinedDetailsProps) => {
  const rating = convertToWholeNumber(voteAverage);
  const ratingColor = getColorByRating(rating);

  return (
    <View className="flex-1 mx-4 mb-6">
      <Text className="font-bold text-lg text-center mt-2">{title}</Text>
      <View className="flex-1 my-4 flex flex-row justify-around items-center">
        {/* Left */}
        <View className="flex-1 flex flex-row items-center">
          <VoteAverage rating={rating} ratingColor={ratingColor} />
          <Text className="font-bold text-sm ml-2">User Score</Text>
        </View>
        <VerticalDivider />
        {/* Right */}
        <Popover
          playTrailerButton={
            <View className="flex-1 flex flex-row items-center">
              <MaterialIcons name="play-arrow" size={24} />
              <Text className="left-5">Play Trailer</Text>
            </View>
          }
          trailers={trailers}
        />
      </View>
      <View className="bg-secondary/20 py-2 px-4 rounded-md">
        <View className="flex flex-row items-center justify-center">
          <Text className=" text-base">{releaseDate || firstAirDate}</Text>
          {duration && (
            <>
              <DotDivider />
              <Text className=" text-base">{duration}</Text>
            </>
          )}
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
