import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";

type NoImageIconProps = {
  styles: string;
};

const NoImageIcon = ({ styles }: NoImageIconProps) => {
  return (
    <View className={`${styles} items-center justify-center bg-white`}>
      <MaterialIcons name="broken-image" size={100} color="gray" />
    </View>
  );
};

export default NoImageIcon;
