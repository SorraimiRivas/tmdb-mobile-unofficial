import _ from "lodash";
import React, { useState } from "react";
import { FlatList, View } from "react-native";
import { Flow } from "react-native-animated-spinkit";

import PeopleCard from "@/components/common/PeopleCard";
import useGetPeople from "@/hooks/useGetPeople";
import { FormattedPeople } from "@/lib/types";

const People = () => {
  const [page, setPage] = useState<number>(1);
  const { data, loading } = useGetPeople("person/popular", page);

  const renderItem = ({ item }: { item: FormattedPeople }) => {
    return <PeopleCard {...item} />;
  };

  const loadMore = () => {
    !loading && setPage(page + 1);
  };

  const debounceLoadMore = _.debounce(loadMore, 1600);

  const FooterComponent = () => {
    return (
      <View className="my-6 flex items-center">
        <Flow size={50} color="#01b4e4" />
      </View>
    );
  };

  return (
    <View className="">
      <FlatList
        keyExtractor={(item, index) => `${item.id + index.toString()}`}
        data={data}
        renderItem={renderItem}
        numColumns={3}
        contentContainerStyle={{
          gap: 20,
          alignItems: "flex-end",
          marginTop: 20,
        }}
        showsVerticalScrollIndicator={false}
        onEndReached={debounceLoadMore}
        onEndReachedThreshold={0.3}
        ListFooterComponent={FooterComponent}
      />
    </View>
  );
};

export default People;
