import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import React, { useState } from "react";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import CommonCard from "@/components/common/CommonCard";
import RowFilter from "@/components/common/RowFilter";
import { Grid } from "react-native-animated-spinkit";
import { FormattedSeries } from "@/lib/types";
import { useGetSeries } from "@/hooks/useGetSeries";

export default function TV() {
  const [selected, setSelected] = useState<string>("day");
  const { data: trendingData, loading } = useGetSeries(
    `trending/tv/${selected}`,
    {},
  );
  const { data: airingTodayData } = useGetSeries("/tv/airing_today", {
    sort_by: "popularity.desc",
    language: "en-US",
  });
  const { data: topRatedData } = useGetSeries("/tv/top_rated", {});

  const renderItem = ({ item }: { item: FormattedSeries }) => {
    return <CommonCard {...item} type="tv" />;
  };

  return (
    <ScrollView className="mb-4" showsVerticalScrollIndicator={false}>
      {/* Trending Series List */}
      <View>
        <View className="mx-4 mt-4 flex flex-row items-center justify-between">
          <Text className="text-2xl font-semibold">Trending</Text>
          <View className="flex flex-row rounded-full bg-white">
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
            data={trendingData}
            renderItem={renderItem}
            horizontal
            contentContainerStyle={{ gap: 10 }}
            ListHeaderComponent={<View className="mx-1" />}
            ListFooterComponent={<View className="mx-1" />}
            showsHorizontalScrollIndicator={false}
          ></FlatList>
        )}
      </View>
      {/* Series Airing Today */}
      <View>
        <Text className="ml-4 mt-4 text-2xl font-semibold">Airing Today</Text>
        <FlatList
          keyExtractor={(item, index) => `${item.id + index.toString()}`}
          data={airingTodayData}
          renderItem={renderItem}
          horizontal
          contentContainerStyle={{ gap: 10 }}
          ListHeaderComponent={<View className="mx-1" />}
          ListFooterComponent={<View className="mx-1" />}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      {/* Top Rated Series */}
      <View>
        <Text className="ml-4 mt-4 text-2xl font-semibold">Top Rated</Text>
        <FlatList
          keyExtractor={(item, index) => `${item.id + index.toString()}`}
          data={topRatedData}
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
