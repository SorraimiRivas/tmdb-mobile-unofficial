import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  FlatList,
} from "react-native";

import CommonCard from "@/components/common/CommonCard";
import { useGetMovies } from "@/hooks/useGetMovies";
import { TMovies } from "@/lib/types";

export default function Movies() {
  const { data, loading, error } = useGetMovies("trending/movie/week", {
    sort_by: "popularity.desc",
  });

  const renderItem = ({ item }: { item: TMovies }) => {
    return <CommonCard {...item} />;
  };

  return loading ? (
    <ActivityIndicator color="red" size={30} />
  ) : (
    <ScrollView className="mx-2">
      <View>
        <Text className="text-2xl">Trending</Text>
        <FlatList
          data={data}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
        ></FlatList>
      </View>
    </ScrollView>
  );
}
