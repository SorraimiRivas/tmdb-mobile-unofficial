import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import useGetPeopleById from "@/hooks/useGetPeopleById";
import { ScrollView } from "react-native-gesture-handler";
import { Image } from "expo-image";
import { genderSelector, imageParser } from "@/lib/utils";
import { profileSize } from "@/api";
import { Grid } from "react-native-animated-spinkit";
import { blurhash } from "@/lib/constants";
import SocialMediaSection from "@/components/SocialMediaSection";
import moment from "moment";
import { styled } from "nativewind";
import { MaterialIcons } from "@expo/vector-icons";
import KnownForSection from "@/components/KnownForSection";

const StyledText = styled(Text);

const Details = () => {
  const [showFullBio, setShowFullBio] = useState<boolean>(false);
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

  useEffect(() => {
    setShowFullBio(false);
  }, [id]);

  return loading ? (
    <View className="flex-1 items-center justify-center">
      <Grid size={50} color="black" />
    </View>
  ) : (
    <ScrollView className="flex-1">
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
          cachePolicy={"memory"}
        />
        <SocialMediaSection data={data?.externalIds!} />
      </View>
      <View className="my-6">
        <Text className="mx-4 text-lg font-bold">Personal Information</Text>
        <View className="mx-4 mb-4 flex flex-row">
          <View className="flex-1 gap-2">
            <View>
              <Text className="text-sm font-semibold">Known For </Text>
              <Text className="text-xs">{data?.knownForDepartment || "-"}</Text>
            </View>
            <View>
              <Text className="text-sm font-semibold">Known Credits</Text>
              <Text className="text-xs">{knownCredits || "-"}</Text>
            </View>
            <View>
              <Text className="text-sm font-semibold">Gender</Text>
              <Text className="text-xs">{gender}</Text>
            </View>
          </View>
          <View className="flex-1 gap-2">
            <View>
              <Text className="text-sm font-semibold">Birthday</Text>
              <Text className="text-xs">{data?.birthday || "-"}</Text>
            </View>
            <View>
              <Text className="text-sm font-semibold">Age</Text>
              <Text className="text-xs">{age || "-"}</Text>
            </View>
            <View>
              <Text className="text-sm font-semibold">Place of Birth</Text>
              <Text className="text-xs">{data?.placeOfBirth || "-"}</Text>
            </View>
          </View>
        </View>
        <View className="mx-4">
          <Text className="mb-4 text-lg font-bold">Biography</Text>
          <StyledText className="text-base leading-6">
            {showFullBio
              ? data?.biography ||
                `We don't have a biography for ${data?.name}.`
              : data?.biography.slice(0, 450) ||
                `We don't have a biography for ${data?.name}.`}
            {!showFullBio && data?.biography.length! > 450 && <Text>...</Text>}
          </StyledText>
          {data?.biography.length! > 450 && (
            <Pressable
              onPress={() => setShowFullBio(!showFullBio)}
              className="flex flex-row items-center"
            >
              <Text className="text-base text-secondary">
                {showFullBio ? "Show Less" : "Read More"}
              </Text>
              <MaterialIcons
                name={showFullBio ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                size={20}
                color="#01b4e4"
              />
            </Pressable>
          )}
        </View>
      </View>
      <KnownForSection
        department={data?.knownForDepartment!}
        credits={data?.combinedCredits!}
      />
    </ScrollView>
  );
};

export default Details;
