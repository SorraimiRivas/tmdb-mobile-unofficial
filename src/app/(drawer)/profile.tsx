import { DrawerToggleButton } from "@react-navigation/drawer";
import { View, Text, FlatList } from "react-native";
import { Image } from "expo-image";

import CountryFlag from "react-native-country-flag";

import useGetUserFavorites from "@/hooks/useGetUserFavoriteMovies";
import { FormattedMovies, FormattedSeries } from "@/lib/types";
import CommonCard from "@/components/common/CommonCard";
import { useAppSelector } from "@/hooks/useRedux";
import { imageParser } from "@/lib/utils";
import { profileSize } from "@/api";

import { ScrollView } from "react-native-gesture-handler";
import { useRouter } from "expo-router";

const Profile = () => {
  const router = useRouter();
  const { account, isLogged } = useAppSelector((state) => state.userSession);
  const { data: movieData, loading: loadingMovie } =
    useGetUserFavorites("movies");
  const { data: seriesData, loading: loadingSeries } =
    useGetUserFavorites("tv");

  const avatar = account?.avatar?.tmdb.avatar_path;
  const avatarURL = imageParser(avatar, profileSize.original);
  const flagCode: string = account?.iso_3166_1!;
  const renderMovies = ({
    item,
  }: {
    item: FormattedMovies | FormattedSeries;
  }) => {
    return <CommonCard {...item} type="movie" />;
  };

  const renderSeries = ({
    item,
  }: {
    item: FormattedMovies | FormattedSeries;
  }) => {
    return <CommonCard {...item} type="tv" />;
  };

  if (!isLogged) {
    router.replace("/login/");
  }

  return (
    <View className="flex-1">
      <View className="relative h-24 bg-primary">
        <View className="top-[50%] ml-4">
          <DrawerToggleButton tintColor="white" />
        </View>
      </View>
      {isLogged && !loadingMovie && !loadingSeries && (
        <ScrollView className="mb-4" showsVerticalScrollIndicator={false}>
          <View className="mt-4 items-center">
            <Image
              source={{ uri: avatarURL }}
              className="h-40 w-40 rounded-full"
            />
          </View>
          <View className="mt-4 items-center pb-4">
            <Text className="mb-4 text-xl font-bold">
              {account?.name || account?.username}
            </Text>
            <CountryFlag isoCode={flagCode} size={40} />
          </View>
          {/* Favorite Movies */}
          <View className="mt-4">
            <Text className="ml-4 text-xl font-bold">Favorite Movies</Text>
            <FlatList
              data={movieData}
              horizontal
              keyExtractor={(item, index) => `${item.id + index}`.toString()}
              renderItem={renderMovies}
              contentContainerStyle={{ gap: 10 }}
              ListHeaderComponent={<View className="mx-1" />}
              ListFooterComponent={<View className="mx-1" />}
            />
          </View>
          {/* Favorite Series */}
          <View className="mt-4">
            <Text className="ml-4 text-xl font-bold">Favorite Series</Text>
            <FlatList
              data={seriesData}
              horizontal
              keyExtractor={(item, index) => `${item.id + index}`.toString()}
              renderItem={renderSeries}
              contentContainerStyle={{ gap: 10 }}
              ListHeaderComponent={<View className="mx-1" />}
              ListFooterComponent={<View className="mx-1" />}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default Profile;
