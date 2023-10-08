import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { useGetTvSeries } from "../../../hooks/useGetTvSeries";
import { ScrollView } from "react-native-gesture-handler";

export default function TV() {
  const { data, loading, error } = useGetTvSeries("trending/tv/week", {});

  return loading ? (
    <ActivityIndicator color="blue" size={30} />
  ) : (
    <ScrollView>
      {data.map((series) => (
        <View key={series.id} style={styles.container}>
          <Link href={`/tv/${series.id}`} asChild>
            <Text style={styles.text}>{series.name}</Text>
          </Link>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    margin: 4,
  },
  text: {
    backgroundColor: "gray",
    color: "white",
    padding: 4,
    paddingHorizontal: 8,
    borderRadius: 50,
  },
});
