import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { ExternalIds, SocialMedia } from "./types";

export const socialMediaConstructor = (item: ExternalIds) => {
  const arr: SocialMedia[] = [];
  const entries = Object.entries(item);

  entries.forEach(([key, value]) => {
    switch (key) {
      case "facebook_id":
        value
          ? arr.push({
              href: `facebook.com/${value}`,
              icon: <MaterialIcons name="facebook" size={33} color="black" />,
            })
          : null;
        break;
      case "instagram_id":
        value
          ? arr.push({
              href: `instagram.com/${value}`,
              icon: (
                <MaterialCommunityIcons
                  name="instagram"
                  size={33}
                  color="black"
                />
              ),
            })
          : null;
        break;
      case "twitter_id":
        value
          ? arr.push({
              href: `twitter.com/${value}`,
              icon: (
                <MaterialCommunityIcons
                  name="twitter"
                  size={33}
                  color="black"
                />
              ),
            })
          : null;
        break;
      case "tiktok_id":
        value
          ? arr.push({
              href: `tiktok.com/@${value}`,
              icon: <FontAwesome5 name="tiktok" size={30} color="black" />,
            })
          : null;
        break;
      default:
        null;
    }
  });

  return arr;
};
