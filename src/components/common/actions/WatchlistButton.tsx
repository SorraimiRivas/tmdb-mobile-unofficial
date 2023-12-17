import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

type Props = {
  onPress: () => void;
  isWatchlisted: boolean;
};

const WatchlistButton = ({ onPress, isWatchlisted }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      className="mx-1 h-10 w-10 items-center justify-center rounded-full bg-primary"
    >
      <Ionicons
        name="md-bookmark"
        size={25}
        color={isWatchlisted ? "#3FCFFF" : "white"}
      />
    </Pressable>
  );
};

export default WatchlistButton;
