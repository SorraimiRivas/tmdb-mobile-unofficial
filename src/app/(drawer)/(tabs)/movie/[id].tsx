import {
  View,
  Text,
  ScrollView,
  useWindowDimensions,
  FlatList,
} from "react-native";
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
import { Cast } from "@/lib/types";
import CastCard from "@/components/common/CastCard";
import FavoriteButton from "@/components/common/actions/FavoriteButton";
import useFavorites from "@/hooks/useAddFavorites";
import WatchlistButton from "@/components/common/actions/WatchlistButton";
import RatingButton from "@/components/common/actions/RatingButton";
import ListButton from "@/components/common/actions/ListButton";
import useAddWatchlist from "@/hooks/useAddWatchlist";
import useGetAccountStates from "@/hooks/useGetItemState";

export default function Details() {
  const { id } = useLocalSearchParams();
  const { data, loading, error } = useGetMovieById(`movie/${id}`, {
    append_to_response: "credits,videos",
  });

  const { addFavorite, loading: loadingFavorites } = useFavorites();
  const { addWatchlist, loading: loadingWatchlist } = useAddWatchlist();
  const { data: stateData, refetchItemState } = useGetAccountStates(
    Number(id),
    "movie",
  );

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

  const handleAddFavorite = async () => {
    !loadingFavorites &&
      (await addFavorite({
        media_type: "movie",
        favorite: !stateData?.favorite,
        media_id: Number(id),
      }));
    !loadingFavorites && refetchItemState();
  };

  const handleAddWatchlist = () => {
    !loadingWatchlist &&
      addWatchlist({
        media_type: "movie",
        watchlist: !stateData?.watchlist,
        media_id: Number(id),
      });
    !loadingWatchlist && refetchItemState();
  };

  return loading ? (
    <View className="flex-1 items-center justify-center">
      <Grid size={50} color="#01b4e4" />
    </View>
  ) : (
    <ScrollView
      className="relative mb-20 flex flex-1 flex-col"
      style={{ width: width }}
    >
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
        duration={duration}
        releaseDate={releaseDate}
        tagline={data?.tagline!}
        voteAverage={data?.voteAverage!}
        trailers={trailers}
      />
      {data?.credits.cast && (
        <View className="mb-6">
          <Text className="mb-4 ml-4 text-lg font-bold">Top Billed Cast</Text>
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
      )}
    </ScrollView>
  );
}
