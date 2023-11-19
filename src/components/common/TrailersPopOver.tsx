import React from "react";
import { Pressable, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Popover from "react-native-popover-view";
import { TrailerVideos } from "@/lib/types";
import { Link } from "expo-router";

type TrailersPopoverProps = {
  trailers: TrailerVideos[];
};

const TrailersPopover = ({ trailers }: TrailersPopoverProps) => {
  const disabled = trailers[0].name === "No Trailers";

  return (
    <Popover
      from={
        <TouchableOpacity disabled={disabled}>
          <View
            className="flex flex-row items-center gap-2"
            style={{ opacity: disabled ? 0.5 : 1 }}
          >
            <MaterialCommunityIcons
              name="youtube"
              size={24}
              color={disabled ? "gray" : "red"}
            />
            <Text>Watch Trailer</Text>
          </View>
        </TouchableOpacity>
      }
      popoverStyle={{ borderRadius: 5, paddingVertical: 4 }}
    >
      {trailers.map((trailer) => (
        <Link
          asChild
          key={trailer.id}
          href={`https://www.youtube.com/watch?v=${trailer.key}`}
          className="mx-2 my-1 rounded-md bg-secondary/20"
        >
          <Pressable className="">
            <Text className="px-2 py-1 text-base">{trailer.name}</Text>
          </Pressable>
        </Link>
      ))}
    </Popover>
  );
};

export default TrailersPopover;
