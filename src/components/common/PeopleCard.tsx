import { Image } from "expo-image";
import { Link } from "expo-router";
import { styled } from "nativewind";
import { View, Text, Pressable, Platform } from "react-native";

import NoImageIcon from "./NoImageIcon";

import { profileSize } from "@/api";
import { blurhash } from "@/lib/constants";
import { imageParser } from "@/lib/utils";

type Props = {
  name: string;
  profilePath: string;
  id: number;
};

const StyledView = styled(View);

const PeopleCard = ({ name, profilePath, id }: Props) => {
  const imageURL = imageParser(profilePath, profileSize.lg);

  return (
    <Link
      href={`/person/${id}`}
      asChild
      className="mx-2 bg-gray-100"
      style={{ width: "29%" }}
    >
      <Pressable>
        <StyledView
          className={`${
            Platform.OS === "ios" ? "shadow-sm" : "shadow-xl"
          } mb-3 h-[180] overflow-clip rounded-md bg-gray-100 shadow-black`}
        >
          {imageURL ? (
            <Image
              source={{ uri: imageURL }}
              className="mb-2 h-[180] w-[100%] rounded-md bg-white"
              contentFit="cover"
              placeholder={blurhash}
              transition={1000}
            />
          ) : (
            <NoImageIcon styles="h-[180] rounded-md" />
          )}
        </StyledView>
        <Text className="text-sm font-semibold" numberOfLines={2}>
          {name}
        </Text>
      </Pressable>
    </Link>
  );
};

export default PeopleCard;
