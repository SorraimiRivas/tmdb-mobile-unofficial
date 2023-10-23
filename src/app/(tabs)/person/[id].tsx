import { View, Text } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import useGetPeopleById from "@/hooks/useGetPeopleById";
import { ScrollView } from "react-native-gesture-handler";
import { Image } from "expo-image";
import { imageParser } from "@/lib/utils";
import { profileSize } from "@/api";
import { Grid } from "react-native-animated-spinkit";
import { blurhash } from "@/lib/constants";
import SocialMediaSection from "@/components/SocialMediaSection";

const Details = () => {
  const { id } = useLocalSearchParams();
  const { data, loading, error } = useGetPeopleById(`person/${id}`, {
    append_to_response: "external_ids",
  });

  const imageURL = imageParser(data?.profilePath, profileSize.original);

  return loading ? (
    <View className="flex-1 items-center justify-center">
      <Grid size={50} color="black" />
    </View>
  ) : (
    <ScrollView className="flex-1">
      <Stack.Screen options={{ title: data?.name }} />
      <View className="mt-4 h-[500] items-center">
        <Image
          source={{ uri: imageURL }}
          className="mb-4 h-[250] w-[170] rounded-md"
          contentFit="cover"
          transition={{ effect: "curl-down", duration: 1000 }}
          placeholder={blurhash}
          cachePolicy={"memory"}
        />
        <SocialMediaSection data={data?.externalIds!} />
      </View>
    </ScrollView>
  );
};

export default Details;
