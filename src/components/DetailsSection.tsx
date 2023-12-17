import { View, Text } from "react-native";

import VerticalDivider from "./common/VerticalDivider";
import TrailersPopover from "./common/TrailersPopover";
import VoteAverage from "./common/VoteAverage";
import DotDivider from "./common/DotDivider";

import { convertToWholeNumber, getColorByRating } from "@/lib/utils";
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
    <View className="w-full flex-1 px-4 py-6">
      <Text className="mt-2 text-center text-lg font-bold">{title}</Text>
      <View className="my-4 flex flex-1 flex-row items-center justify-around">
        {/* Left */}
        <View className="left-2 flex flex-1 flex-row items-center">
          <VoteAverage rating={rating} ratingColor={ratingColor} />
          <Text className="ml-2 text-sm font-bold">User Score</Text>
        </View>
        <View className="left-[70] flex-1">
          <VerticalDivider />
        </View>
        {/* Right */}
        <View className="flex-1">
          <TrailersPopover trailers={trailers!} />
        </View>
      </View>
      <View className="rounded-md bg-secondary/30 px-4 py-2">
        <View className="flex flex-row items-center justify-center">
          <Text className="text-base">{releaseDate || firstAirDate}</Text>
          {duration && (
            <>
              <DotDivider />
              <Text className=" text-base">{duration}</Text>
            </>
          )}
          <View className="bg-white" />
        </View>
        <Text className=" text-center text-sm">{genres}</Text>
      </View>
      {tagline && (
        <Text className="mt-4 text-base font-light italic">{tagline}</Text>
      )}
      <Text className="mt-4 text-lg font-bold">Overview</Text>
      <Text className="mt-2 text-left text-base">{overview}</Text>
    </View>
  );
};

export default DetailsSection;
