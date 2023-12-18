import { Image } from "expo-image";
import { Stack, useLocalSearchParams } from "expo-router";
import moment from "moment";
import React from "react";
import { View } from "react-native";
import { Grid } from "react-native-animated-spinkit";
import { ScrollView } from "react-native-gesture-handler";

import { profileSize } from "@/api";
import KnownForSection from "@/components/KnownForSection";
import PersonalInformationSection from "@/components/PersonalInformationSection";
import SocialMediaSection from "@/components/SocialMediaSection";
import useGetPeopleById from "@/hooks/useGetPeopleById";
import { blurhash } from "@/lib/constants";
import { genderSelector, imageParser } from "@/lib/utils";

const Details = () => {
  const { id } = useLocalSearchParams();
  const { data, loading } = useGetPeopleById(`person/${id}`, {
    append_to_response: "external_ids,combined_credits",
  });

  const imageURL = imageParser(data?.profilePath, profileSize.original);
  const gender = genderSelector(data?.gender!);
  const age = moment().diff(data?.birthday, "years");
  const knownCredits =
    data?.knownForDepartment === "Acting"
      ? data.combinedCredits.cast.length
      : data?.combinedCredits.crew.length;

  return loading ? (
    <View className="flex-1 items-center justify-center">
      <Grid size={50} color="black" />
    </View>
  ) : (
    <ScrollView className="mb-20 flex-1">
      <Stack.Screen
        options={{
          title: data?.name,
        }}
      />
      <View className="mt-4 items-center">
        <Image
          source={{ uri: imageURL }}
          className="mb-4 h-[250] w-[170] rounded-md"
          contentFit="cover"
          transition={{ effect: "curl-down", duration: 1000 }}
          placeholder={blurhash}
          cachePolicy="memory"
        />
        <SocialMediaSection data={data?.externalIds!} />
      </View>
      <View>
        <PersonalInformationSection
          id={id}
          {...data}
          gender={gender}
          age={age}
          knownCredits={knownCredits}
        />
      </View>
      <KnownForSection
        department={data?.knownForDepartment!}
        credits={data?.combinedCredits!}
      />
    </ScrollView>
  );
};

export default Details;
