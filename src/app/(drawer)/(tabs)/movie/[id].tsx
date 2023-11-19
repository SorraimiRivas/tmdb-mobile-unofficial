import { View, Text, ScrollView, useWindowDimensions } from "react-native";
import { useLocalSearchParams } from "expo-router";

import useGetMovieById from "@/hooks/useGetMovieById";
import {
  formatDate,
  imageParser,
  joinGenres,
  runtimeFormatter,
  trailersArrayFilter,
} from "@/lib/utils";
import { backdropSize, posterSize } from "@/api";
import { Grid } from "react-native-animated-spinkit";
import BannerSection from "@/components/BannerSection";
import DetailsSection from "@/components/DetailsSection";
import { FlatList } from "react-native-gesture-handler";
import { Cast } from "@/lib/types";
import CastCard from "@/components/common/CastCard";

export default function Details() {
  const { id } = useLocalSearchParams();
  const { data, loading, error } = useGetMovieById(`movie/${id}`, {
    append_to_response: "credits,videos",
  });
  const { width } = useWindowDimensions();

  const posterURL = imageParser(data?.poster, posterSize.xl);
  const backdropURL = imageParser(data?.backdrop, backdropSize.lg);
  const genres = joinGenres(data?.genres!);
  const duration = runtimeFormatter(data?.runtime!);
  const releaseDate = formatDate(data?.releaseDate!);
  const trailers = trailersArrayFilter(data?.videos.results!);

  const renderItem = ({ item }: { item: Cast }) => {
    return <CastCard {...item} />;
  };

  return loading ? (
    <View className="flex-1 items-center justify-center">
      <Grid size={50} color="#01b4e4" />
    </View>
  ) : (
    <ScrollView
      className="relative flex flex-1 flex-col"
      style={{ width: width }}
    >
      <BannerSection backdropImageURL={backdropURL} posterURL={posterURL} />
      <DetailsSection
        overview={data?.overview!}
        title={data?.title!}
        genres={genres}
        duration={duration}
        releaseDate={releaseDate}
        tagline={data?.tagline!}
        voteAverage={data?.voteAverage!}
        trailers={trailers}
      />
      {data?.credits.cast ? (
        <View className="mb-6 px-4">
          <Text className="mb-4 text-lg font-bold">Top Billed Cast</Text>
          <FlatList
            horizontal
            keyExtractor={(item) => item.id!.toString()}
            data={data?.credits?.cast!}
            renderItem={renderItem}
            contentContainerStyle={{ gap: 10 }}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      ) : null}
    </ScrollView>
  );
}
