import React, { ReactNode, useState } from "react";
import { View, Text, TouchableOpacity, Pressable } from "react-native";
import { Link } from "expo-router";

import { TrailerVideos } from "@/lib/types";

type TrailersPopoverProps = {
  playTrailerButton: ReactNode;
  trailers: TrailerVideos[];
};

const TrailersPopover = ({
  playTrailerButton,
  trailers,
}: TrailersPopoverProps) => {
  const [visible, setVisible] = useState(false);

  const togglePopover = () => {
    setVisible(!visible);
  };

  const handleOutsidePress = () => {
    setVisible(false);
  };

  return (
    <View className="flex-1 items-center justify-center">
      <TouchableOpacity onPress={togglePopover} className="relative">
        {playTrailerButton}
      </TouchableOpacity>
      {visible && (
        <View className="absolute bottom-14 right-0 rounded-md bg-white px-2 py-2 shadow-sm shadow-black">
          <Pressable className="flex-1" onPress={handleOutsidePress} />
          {/* Content Goes Here */}
          {trailers.map((trailer, index) => (
            <Link
              asChild
              href={`https://www.youtube.com/watch?v=${trailer.key}`}
              key={index}
            >
              <Pressable className="my-1 rounded-md bg-tertiary/30 px-2 py-1">
                {({ pressed }) => (
                  <Text
                    className="text-sm"
                    style={{ opacity: pressed ? 0.5 : 1 }}
                  >
                    {trailer.name}
                  </Text>
                )}
              </Pressable>
            </Link>
          ))}
        </View>
      )}
    </View>
  );
};

export default TrailersPopover;
