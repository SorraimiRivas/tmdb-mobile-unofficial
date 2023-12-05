import { DrawerToggleButton } from "@react-navigation/drawer";
import { View, Text, FlatList } from "react-native";
import { Image } from "expo-image";
import React from "react";

import CountryFlag from "react-native-country-flag";

import useGetUserFavoriteMovies from "@/hooks/useGetUserFavoriteMovies";
import CommonCard from "@/components/common/CommonCard";
import { useAppSelector } from "@/hooks/useRedux";
import { imageParser } from "@/lib/utils";
import { profileSize } from "@/api";
import { FormattedMovies, FormattedSeries } from "@/lib/types";
import { ScrollView } from "react-native-gesture-handler";

const Profile = () => {
  const { account } = useAppSelector((state) => state.userSession);
  const { data: movieData } = useGetUserFavoriteMovies("movies");
  const { data: seriesData } = useGetUserFavoriteMovies("tv");

  const avatar = account?.avatar?.tmdb.avatar_path;
  const avatarURL = imageParser(avatar, profileSize.original);

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

  return (
    <View className="flex-1">
      <View className="relative h-20 bg-primary">
        <View className="top-[50%] ml-4">
          <DrawerToggleButton tintColor="white" />
        </View>
      </View>
      <View className="mt-4 items-center">
        <Image source={{ uri: avatarURL }} className="h-40 w-40 rounded-full" />
      </View>
      <View className="mt-4 items-center pb-4">
        <Text className="mb-4 text-xl font-bold">
          {account?.name || account?.username}
        </Text>
        <CountryFlag isoCode={account?.iso_3166_1!} size={40} />
      </View>
      {/* Favorites Movies */}
      <ScrollView className="mb-4">
        <View className="mt-4">
          <Text className="ml-7 text-xl font-bold">Favorite Movies</Text>
          <FlatList
            data={movieData}
            horizontal
            keyExtractor={(item, index) => `${item.id + index}`.toString()}
            renderItem={renderMovies}
            ListEmptyComponent={() => (
              <View>
                <Text>No items found</Text>
              </View>
            )}
            contentContainerStyle={{ gap: 20 }}
            ListHeaderComponent={<View className="mx-1" />}
            ListFooterComponent={<View className="mx-1" />}
          />
        </View>
        {/* Favorite Series */}
        <View className="mt-4">
          <Text className="ml-7 text-xl font-bold">Favorite Series</Text>
          <FlatList
            data={seriesData}
            horizontal
            keyExtractor={(item, index) => `${item.id + index}`.toString()}
            renderItem={renderSeries}
            ListEmptyComponent={() => (
              <View>
                <Text>No items found</Text>
              </View>
            )}
            contentContainerStyle={{ gap: 20 }}
            ListHeaderComponent={<View className="mx-1" />}
            ListFooterComponent={<View className="mx-1" />}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
