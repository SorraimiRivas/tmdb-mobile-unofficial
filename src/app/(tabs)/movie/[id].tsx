import { View, Text, ActivityIndicator } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import useMovie from "../../../hooks/useGetMovie";

export default function Details() {
  const { id } = useLocalSearchParams();
  const { data, loading, error } = useMovie(`movie/${id}`, {});

  return (
    <>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <Text>
            Details for {id} for {data && data.title}
          </Text>
        </View>
      )}
    </>
  );
}
