import React from "react";
import { View, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import KnownForCard from "./common/KnownForCard";

import { CombinedCredits, KnownForCardTypes } from "@/lib/types";
import { knownForConstructor } from "@/lib/utils";

type KnownForSectionProps = {
  department: string;
  credits: CombinedCredits;
};

const KnownForSection = ({ department, credits }: KnownForSectionProps) => {
  const knownForArray = knownForConstructor(credits, department);

  const renderItem = ({ item }: { item: KnownForCardTypes }) => {
    return <KnownForCard {...item} />;
  };

  return (
    <View className="my-4">
      <View>
        <Text className="mb-4 ml-4 text-lg font-bold">Known For</Text>
      </View>
      <FlatList
        keyExtractor={(item, index) => `${item.id + index.toString()}`}
        data={knownForArray}
        renderItem={renderItem}
        contentContainerStyle={{ gap: 10 }}
        ListHeaderComponent={<View className="mx-1" />}
        ListFooterComponent={<View className="mx-1" />}
        showsHorizontalScrollIndicator={false}
        horizontal
      />
    </View>
  );
};

export default KnownForSection;
