import { useState } from "react";
import { View, Text, ScrollView, FlatList } from "react-native";

import CommonCard from "@/components/common/CommonCard";
import { useGetMovies } from "@/hooks/useGetMovies";
import { IMovies } from "@/lib/types";
import { Grid } from "react-native-animated-spinkit";
import RowFilter from "@/components/common/RowFilter";

export default function Movies() {
  const [selected, setSelected] = useState<string>("day");

  const {
    data: trendingData,
    loading,
    error,
  } = useGetMovies(`trending/movie/${selected}`, {
    sort_by: "popularity.desc",
  });

  const { data: popularData } = useGetMovies("movie/top_rated");
  const { data: inTheaters } = useGetMovies("movie/now_playing");

  const renderItem = ({ item }: { item: IMovies }) => {
    return <CommonCard {...item} type="movie" />;
  };
  return (
    <ScrollView className="mb-4" showsVerticalScrollIndicator={false}>
      {/* Trending Movies List */}
      <View>
        <View className="flex flex-row justify-between items-center mx-2 mt-4">
          <Text className="font-semibold text-2xl">Trending</Text>
          <View className="flex flex-row bg-primary/10 rounded-full">
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
          <View className="flex justify-center items-center h-[370]">
            <Grid color="#01b4e4" size={50} />
          </View>
        ) : (
          <FlatList
            keyExtractor={(item, index) => item.id.toString()}
            data={trendingData}
            renderItem={renderItem}
            horizontal
          ></FlatList>
        )}
      </View>
      {/* Movies In Theaters */}
      <View>
        <Text className="font-semibold text-2xl ml-2 mt-4">In Theaters</Text>
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={inTheaters}
          renderItem={renderItem}
          horizontal
        />
      </View>
      {/* Top Rated Movies */}
      <View>
        <Text className="font-semibold text-2xl ml-2 mt-4">Top Rated</Text>
        <FlatList
          keyExtractor={(item, index) => item.id.toString()}
          data={popularData}
          renderItem={renderItem}
          horizontal
        />
      </View>
    </ScrollView>
  );
}
