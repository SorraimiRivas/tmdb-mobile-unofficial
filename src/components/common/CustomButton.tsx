import React from "react";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

type CustomButtonProps = {
  label: string;
  buttonStyle: string;
  labelStyle: string;
  onPress?: () => void;
};

const CustomButton = ({
  buttonStyle,
  label,
  labelStyle,
  onPress,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity className={`${buttonStyle}`} onPress={onPress}>
      <Text className={`${labelStyle}`}>{label}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
