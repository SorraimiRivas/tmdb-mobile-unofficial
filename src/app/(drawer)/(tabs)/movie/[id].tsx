import {
  View,
  Text,
  ScrollView,
  useWindowDimensions,
  FlatList,
} from "react-native";
import { Grid } from "react-native-animated-spinkit";
import { useLocalSearchParams } from "expo-router";

import {
  formatDate,
  imageParser,
  joinGenres,
  runtimeFormatter,
  trailersArrayFilter,
} from "@/lib/utils";
import WatchlistButton from "@/components/common/actions/WatchlistButton";
import FavoriteButton from "@/components/common/actions/FavoriteButton";
import RatingButton from "@/components/common/actions/RatingButton";
import ListButton from "@/components/common/actions/ListButton";
import useGetAccountStates from "@/hooks/useGetItemState";
import DetailsSection from "@/components/DetailsSection";
import BannerSection from "@/components/BannerSection";
import useGetMovieById from "@/hooks/useGetMovieById";
import useAddWatchlist from "@/hooks/useAddWatchlist";
import CastCard from "@/components/common/CastCard";
import useFavorites from "@/hooks/useAddFavorites";
import { backdropSize, posterSize } from "@/api";
import { Cast } from "@/lib/types";

export default function Details() {
  const { id } = useLocalSearchParams();
  const { data, loading } = useGetMovieById(`movie/${id}`, {
    append_to_response: "credits,videos",
  });

  const { addFavorite, loading: loadingAddFavorites } = useFavorites();
  const { addWatchlist, loading: loadingWatchlist } = useAddWatchlist();
  const {
    data: stateData,
    refetchItemState,
    loading: loadingStateData,
  } = useGetAccountStates(Number(id), "movie");

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
    !loadingAddFavorites &&
      (await addFavorite({
        media_type: "movie",
        favorite: !stateData?.favorite,
        media_id: Number(id),
      }));
    !loadingAddFavorites && refetchItemState();
  };

  const handleAddWatchlist = async () => {
    !loadingWatchlist &&
      (await addWatchlist({
        media_type: "movie",
        watchlist: !stateData?.watchlist,
        media_id: Number(id),
      }));
    !loadingWatchlist && refetchItemState();
  };

  return loading && loadingStateData ? (
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
        <View className="absolute bottom-2 right-2 flex flex-row items-center">
          <ListButton />
          <FavoriteButton
            onPress={handleAddFavorite}
            isFavorite={stateData?.favorite!}
          />
          <WatchlistButton
            onPress={handleAddWatchlist}
            isWatchlisted={stateData?.watchlist!}
          />
          <RatingButton media_id={Number(id)} media_type="movie" />
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
