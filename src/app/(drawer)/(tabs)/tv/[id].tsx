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
import ListButton from "@/components/common/actions/ListButton";
import FavoriteButton from "@/components/common/actions/FavoriteButton";
import WatchlistButton from "@/components/common/actions/WatchlistButton";
import RatingButton from "@/components/common/actions/RatingButton";
import useFavorites from "@/hooks/useAddFavorites";
import useAddWatchlist from "@/hooks/useAddWatchlist";
import useGetAccountStates from "@/hooks/useGetItemState";

export default function TVDetails() {
  const { id } = useLocalSearchParams();
  const { data, loading } = useGetSeriesById(`tv/${id}`, {
    append_to_response: "credits,videos",
  });

  const { addFavorite } = useFavorites();
  const { addWatchlist } = useAddWatchlist();
  const { data: stateData, refetchItemState } = useGetAccountStates(
    Number(id),
    "tv",
  );

  const { width } = useWindowDimensions();

  const renderItem = ({ item }: { item: Cast }) => {
    return <CastCard {...item} />;
  };

  const posterURL = imageParser(data?.poster!, posterSize.xl);
  const backdropURL = imageParser(data?.backdrop!, backdropSize.lg);
  const genres = joinGenres(data?.genres!);
  const firstAirDate = formatDate(data?.firstAirDate!);
  const trailers = trailersArrayFilter(data?.videos.results!);

  const handleAddFavorite = async () => {
    await addFavorite({
      media_type: "tv",
      favorite: !stateData?.favorite,
      media_id: Number(id),
    });
    refetchItemState();
  };

  const handleAddWatchlist = () => {
    addWatchlist({
      media_type: "tv",
      watchlist: !stateData?.watchlist,
      media_id: Number(id),
    });
    refetchItemState();
  };

  return loading ? (
    <View className="flex-1 items-center justify-center">
      <Fold size={50} color="#01b4e4" />
    </View>
  ) : (
    <ScrollView
      className="relative mb-20 flex flex-1 flex-col"
      style={{ width: width }}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar style="auto" />
      <View className="relative">
        <BannerSection backdropImageURL={backdropURL} posterURL={posterURL} />
        <View
          className="absolute bottom-2 right-4 flex flex-row items-center"
          style={{ gap: 5 }}
        >
          <ListButton />
          <FavoriteButton
            onPress={handleAddFavorite}
            isFavorite={stateData?.favorite!}
          />
          <WatchlistButton
            onPress={handleAddWatchlist}
            isWatchlisted={stateData?.watchlist!}
          />
          <RatingButton />
        </View>
      </View>
      <DetailsSection
        overview={data?.overview!}
        title={data?.title!}
        genres={genres}
        firstAirDate={firstAirDate}
        tagline={data?.tagline!}
        voteAverage={data?.voteAverage!}
        trailers={trailers!}
      />
      {data?.credits.cast.length !== 0 ? (
        <View className="my-6">
          <Text className="mb-4 ml-4 text-lg font-bold">Series Cast</Text>
          <FlatList
            horizontal
            keyExtractor={(item) => item.id!.toString()}
            data={data?.credits?.cast!}
            renderItem={renderItem}
            contentContainerStyle={{ gap: 10 }}
            showsHorizontalScrollIndicator={false}
            ListHeaderComponent={<View className="mx-1" />}
            ListFooterComponent={<View className="mx-1" />}
          />
        </View>
      ) : null}
    </ScrollView>
  );
}
