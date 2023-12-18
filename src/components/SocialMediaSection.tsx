import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { printer } from "@/lib/constants";
import { socialMediaConstructor } from "@/lib/icons";
import { ExternalIds, SocialMedia } from "@/lib/types";

type SocialMediaProps = {
  data: ExternalIds;
};

const SocialMediaSection = ({ data }: SocialMediaProps) => {
  const socialMediaArray = socialMediaConstructor(data);

  return (
    <View className="flex flex-row gap-4">
      {socialMediaArray.map((item) => (
        <Link href={`https://${item.href}`} key={item.href} asChild>
          <Pressable>{item.icon}</Pressable>
        </Link>
      ))}
    </View>
  );
};

export default SocialMediaSection;
