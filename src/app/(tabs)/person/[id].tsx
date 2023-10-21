import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import useGetPeopleById from "@/hooks/useGetPeopleById";

const Details = () => {
  const { id } = useLocalSearchParams();
  const { data, loading, error } = useGetPeopleById(`person/${id}`);

  return (
    <View>
      <Text>Details</Text>
    </View>
  );
};

export default Details;
