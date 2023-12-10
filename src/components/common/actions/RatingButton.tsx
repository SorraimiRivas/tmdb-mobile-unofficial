import { Pressable } from "react-native";
import React from "react";
import Popover from "react-native-popover-view/dist/Popover";
import { FontAwesome } from "@expo/vector-icons";

const RatingButton = () => {
  return (
    <Popover
      from={
        <Pressable className="h-10 w-10 items-center justify-center rounded-full bg-primary">
          <FontAwesome
            name="star"
            size={25}
            color={true ? "#FFD700" : "white"}
          />
        </Pressable>
      }
    ></Popover>
  );
};

export default RatingButton;
