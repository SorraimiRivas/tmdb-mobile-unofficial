import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  ImageBackground,
} from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

import useMovie from "@/hooks/useGetMovie";
import { imageParser } from "@/lib/utils";
import { backdropSize, posterSize } from "@/api";
import { Grid } from "react-native-animated-spinkit";

export default function Details() {
  const { id } = useLocalSearchParams();
  const { data, loading, error } = useMovie(`movie/${id}`, {});

  const backdropImageURL = imageParser(data?.backdrop_path, backdropSize.lg);
  const posterURL = imageParser(data?.poster_path, posterSize.xl);

  return loading ? (
    <View className="flex-1 items-center justify-center">
      <Grid size={50} color="#01b4e4" />
    </View>
  ) : (
    <ScrollView className="w-full flex flex-col">
      <ImageBackground
        source={{ uri: backdropImageURL }}
        className="w-full h-64 z-0 relative"
        style={{}}
      >
        <View className="w-full h-full bg-secondary/70 absolute" />
        <View className="w-full h-52 mt-6 mx-2 flex flex-row overflow-hidden">
          <View className="">
            <Image
              source={{ uri: posterURL }}
              className="w-32 h-52 rounded-md"
            />
          </View>
          <View className="h-52 w-full flex flex-col ml-2 bg-primary/90">
            <Text numberOfLines={2} className="text-white font-medium">
              {data?.title}
            </Text>
            <Text className="text-white">{data?.vote_average}</Text>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}
