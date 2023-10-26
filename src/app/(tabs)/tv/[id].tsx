import {
  View,
  Text,
  useWindowDimensions,
  ScrollView,
  FlatList,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useLocalSearchParams } from "expo-router";
import { Fold } from "react-native-animated-spinkit";

import { Cast } from "@/lib/types";
import CastCard from "@/components/common/CastCard";
import {
  formatDate,
  imageParser,
  joinGenres,
  trailersArrayFilter,
} from "@/lib/utils";
import { backdropSize, posterSize } from "@/api";
import BannerSection from "@/components/BannerSection";
import DetailsSection from "@/components/DetailsSection";
import useGetSeriesById from "@/hooks/useGetSeriesById";

export default function TVDetails() {
  const { id } = useLocalSearchParams();
  const { data, loading } = useGetSeriesById(`tv/${id}`, {
    append_to_response: "credits,videos",
  });

  const { width } = useWindowDimensions();

  const renderItem = ({ item }: { item: Cast }) => {
    return <CastCard {...item} />;
  };

  const posterURL = imageParser(data?.poster!, posterSize.xl);
  const backdropURL = imageParser(data?.backdrop!, backdropSize.lg);
  const genres = joinGenres(data?.genres!);
  const firstAirDate = formatDate(data?.firstAirDate!);
  const trailers = trailersArrayFilter(data?.videos.results!);

  return loading ? (
    <View className="flex-1 items-center justify-center">
      <Fold size={50} color="#01b4e4" />
    </View>
  ) : (
    <ScrollView
      className="relative flex flex-1 flex-col"
      style={{ width: width }}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar style="auto" />
      <BannerSection backdropImageURL={backdropURL} posterURL={posterURL} />
      <DetailsSection
        overview={data?.overview!}
        title={data?.title!}
        genres={genres}
        firstAirDate={firstAirDate}
        tagline={data?.tagline!}
        voteAverage={data?.voteAverage!}
        trailers={trailers!}
      />
      {data?.credits.cast ? (
        <View className="mx-4 mb-6">
          <Text className="mb-4 text-lg font-bold">Series Cast</Text>
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
