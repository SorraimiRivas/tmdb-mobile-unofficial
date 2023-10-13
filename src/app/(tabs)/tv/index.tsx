import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useGetSeries } from "../../../hooks/useGetSeries";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import CommonCard from "@/components/common/CommonCard";
import RowFilter from "@/components/common/RowFilter";
import { Grid } from "react-native-animated-spinkit";
import { FormattedSeries } from "@/lib/types";

export default function TV() {
  const [selected, setSelected] = useState<string>("day");
  const { data: trendingData, loading } = useGetSeries(
    `trending/tv/${selected}`,
    {}
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
        <View className="flex flex-row justify-between items-center mx-4 mt-4">
          <Text className="font-semibold text-2xl">Trending</Text>
          <View className="flex flex-row bg-white rounded-full">
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
            data={trendingData}
            renderItem={renderItem}
            horizontal
            contentContainerStyle={{ paddingBottom: 8 }}
          ></FlatList>
        )}
      </View>
      {/* Series Airing Today */}
      <View>
        <Text className="font-semibold text-2xl ml-4 mt-4">Airing Today</Text>
        <FlatList
          data={airingTodayData}
          renderItem={renderItem}
          horizontal
          contentContainerStyle={{ paddingBottom: 8 }}
        />
      </View>
      {/* Top Rated Series */}
      <View>
        <Text className="font-semibold text-2xl ml-4 mt-4">Top Rated</Text>
        <FlatList
          data={topRatedData}
          renderItem={renderItem}
          horizontal
          contentContainerStyle={{ paddingBottom: 8 }}
        />
      </View>
    </ScrollView>
  );
}
