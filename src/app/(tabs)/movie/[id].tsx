import { View, Text, ScrollView, useWindowDimensions } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";

import useMovie from "@/hooks/useGetMovie";
import {
  filterOfficialTrailer,
  formatDate,
  formatMinutesToHoursAndMinutes,
  imageParser,
  joinGenres,
} from "@/lib/utils";
import { backdropSize, posterSize } from "@/api";
import { Grid } from "react-native-animated-spinkit";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import BannerSection from "@/components/BannerSection";
import DetailsSection from "@/components/DetailsSection";

export default function Details() {
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const { id } = useLocalSearchParams();
  const { data, loading, error } = useMovie(`movie/${id}`, {
    append_to_response: "credits,videos",
  });
  const { width } = useWindowDimensions();

  const backdropImageURL = imageParser(data?.backdrop_path, backdropSize.lg);
  const posterURL = imageParser(data?.poster_path, posterSize.xl);
  const releaseDate = formatDate(data?.release_date!);
  const duration = formatMinutesToHoursAndMinutes(data?.runtime!);
  const genres = joinGenres(data?.genres!);
  const videoURL = filterOfficialTrailer(data?.videos.results);

  // console.log(JSON.stringify(data?.videos!, "", 2));

  useEffect(() => {
    if (loading) {
      setPageLoading(true);
    } else {
      setPageLoading(false);
    }
  }, [loading]);

  return pageLoading ? (
    <View className="flex-1 items-center justify-center">
      <Grid size={50} color="#01b4e4" />
    </View>
  ) : (
    <ScrollView
      className="flex-1 flex flex-col relative"
      style={{ width: width }}
    >
      <StatusBar style="auto" />
      <BannerSection
        backdropImageURL={backdropImageURL}
        posterURL={posterURL}
      />
      <DetailsSection
        overview={data?.overview!}
        title={data?.title!}
        genres={genres}
        duration={duration}
        releaseDate={releaseDate}
        tagline={data?.tagline!}
        vote_average={data?.vote_average!}
        trailerLink={videoURL}
      />
    </ScrollView>
  );
}
