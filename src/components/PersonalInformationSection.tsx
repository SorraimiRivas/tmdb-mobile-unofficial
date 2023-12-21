import { MaterialIcons } from "@expo/vector-icons";
import { styled } from "nativewind";
import React, { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";

type PersonalInformationSectionProps = {
  knownForDepartment?: string;
  knownCredits?: number | undefined;
  gender: string;
  birthday?: string;
  age: number;
  placeOfBirth?: string;
  biography?: string;
  name?: string;
  id: string | string[] | number;
};

const StyledText = styled(Text);

const PersonalInformationSection = ({
  knownForDepartment,
  knownCredits,
  gender,
  birthday,
  age,
  placeOfBirth,
  biography,
  name,
  id,
}: PersonalInformationSectionProps) => {
  const [showFullBio, setShowFullBio] = useState<boolean>(false);

  useEffect(() => {
    setShowFullBio(false);
  }, [id]);

  return (
    <View className="my-6">
      <Text className="mx-4 text-lg font-bold">Personal Information</Text>
      <View className="mx-4 mb-4 flex flex-row">
        <View className="flex-1 gap-2">
          <View>
            <Text className="text-sm font-semibold">Known For </Text>
            <Text className="text-xs">{knownForDepartment || "-"}</Text>
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
            <Text className="text-xs">{birthday || "-"}</Text>
          </View>
          <View>
            <Text className="text-sm font-semibold">Age</Text>
            <Text className="text-xs">{age || "-"}</Text>
          </View>
          <View>
            <Text className="text-sm font-semibold">Place of Birth</Text>
            <Text className="text-xs">{placeOfBirth || "-"}</Text>
          </View>
        </View>
      </View>
      <View className="mx-4">
        <Text className="mb-4 text-lg font-bold">Biography</Text>
        <StyledText className="text-base leading-6">
          {showFullBio
            ? biography || `We don't have a biography for ${name}.`
            : biography!.slice(0, 450) ||
              `We don't have a biography for ${name}.`}
          {!showFullBio && biography!.length! > 450 && <Text>...</Text>}
        </StyledText>
        {biography!.length! > 450 && (
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
  );
};

export default PersonalInformationSection;
