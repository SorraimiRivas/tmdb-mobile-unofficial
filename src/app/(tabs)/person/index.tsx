import { View, Text, useWindowDimensions } from "react-native";
import React, { useState } from "react";
import useGetPeople from "@/hooks/useGetPeople";
import { FlatList } from "react-native-gesture-handler";
import { FormattedPeople } from "@/lib/types";
import CommonCard from "@/components/common/CommonCard";
import { Flow } from "react-native-animated-spinkit";
import _ from "lodash";

const People = () => {
  const [page, setPage] = useState<number>(1);
  const { data, loading } = useGetPeople("person/popular", page);

  const renderItem = ({ item }: { item: FormattedPeople }) => {
    return (
      <View className="mx-5">
        <CommonCard {...item} type="person" />
      </View>
    );
  };

  const loadMore = () => {
    !loading && setPage(page + 1);
  };

  const debounceLoadMore = _.debounce(loadMore, 1600);

  const FooterComponent = () => {
    return (
      <View className="my-6 flex items-center">
        <Flow size={50} color="black" />
      </View>
    );
  };

  return (
    <View className="flex-1 items-center">
      <FlatList
        data={data}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={{ gap: 10 }}
        showsVerticalScrollIndicator={false}
        onEndReached={debounceLoadMore}
        onEndReachedThreshold={0.3}
        ListFooterComponent={FooterComponent}
      />
    </View>
  );
};

export default People;
