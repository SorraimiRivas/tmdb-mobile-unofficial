import moment from "moment";
import { useState } from "react";
import { View, Text, ScrollView, FlatList } from "react-native";
import { Grid } from "react-native-animated-spinkit";

import CommonCard from "@/components/common/CommonCard";
import RowFilter from "@/components/common/RowFilter";
import { useGetMovies } from "@/hooks/useGetMovies";
import { FormattedMovies } from "@/lib/types";

export default function Movies() {
  const [selected, setSelected] = useState<string>("day");

  const { data: trendingData, loading } = useGetMovies(
    `trending/movie/${selected}`,
    {
      sort_by: "popularity.desc",
    },
  );

  // TODO: update to Date-fns
  const minDate = moment().add(1, "day").format("YYYY-MM-DD");
  const maxDate = moment().add(180, "days").format("YYYY-MM-DD");

  const { data: inTheaters } = useGetMovies("movie/now_playing");
  const { data: popularData } = useGetMovies("movie/top_rated");

  const { data: upcoming } = useGetMovies("discover/movie", {
    include_adult: false,
    language: "en-US",
    page: 1,
    sort_by: "popularity.desc",
    with_release_type: 2 | 3,
    "primary_release_date.gte": minDate,
    "primary_release_date.lte": maxDate,
  });

  const renderItem = ({ item }: { item: FormattedMovies }) => {
    return <CommonCard {...item} type="movie" />;
  };

  return (
    <ScrollView className="mb-20" showsVerticalScrollIndicator={false}>
      {/* Trending Movies List */}
      <View>
        <View className="mx-4 mt-4 flex flex-row items-center justify-between">
          <Text className="text-2xl font-semibold">Trending</Text>
          <View className="-z-10 flex flex-row rounded-full bg-primary/10">
            <RowFilter
              label="Today"
              selected={selected === "day"}
              onPress={() => setSelected("day")}
            />
            <RowFilter
              label="This Week"
              selected={selected === "week"}
              onPress={() => setSelected("week")}
            />
          </View>
        </View>
        {loading ? (
          <View className="flex h-[370] items-center justify-center">
            <Grid color="#01b4e4" size={50} />
          </View>
        ) : (
          <FlatList
            keyExtractor={(item) => item.id!.toString()}
            data={trendingData}
            renderItem={renderItem}
            horizontal
            contentContainerStyle={{ gap: 10 }}
            ListHeaderComponent={<View className="mx-1" />}
            ListFooterComponent={<View className="mx-1" />}
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
      {/* Movies In Theaters */}
      <View>
        <Text className="ml-4 mt-4 text-2xl font-semibold">In Theaters</Text>
        <FlatList
          keyExtractor={(item, index) => `${item.id + index.toString()}`}
          data={inTheaters}
          renderItem={renderItem}
          horizontal
          contentContainerStyle={{ gap: 10 }}
          ListHeaderComponent={<View className="mx-1" />}
          ListFooterComponent={<View className="mx-1" />}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      {/* Upcoming Movies  */}
      <View>
        <Text className="ml-4 mt-4 text-2xl font-semibold">Upcoming</Text>
        <FlatList
          keyExtractor={(item, index) => `${item.id + index.toString()}`}
          data={upcoming}
          renderItem={renderItem}
          horizontal
          contentContainerStyle={{ gap: 10 }}
          ListHeaderComponent={<View className="mx-1" />}
          ListFooterComponent={<View className="mx-1" />}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      {/* Top Rated Movies */}
      <View>
        <Text className="ml-4 mt-4 text-2xl font-semibold">Top Rated</Text>
        <FlatList
          keyExtractor={(item, index) => `${item.id + index.toString()}`}
          data={popularData}
          renderItem={renderItem}
          horizontal
          contentContainerStyle={{ gap: 10 }}
          ListHeaderComponent={<View className="mx-1" />}
          ListFooterComponent={<View className="mx-1" />}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </ScrollView>
  );
}
