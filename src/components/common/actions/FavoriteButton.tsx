import { Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";

type Props = {
  onPress: () => void;
  isFavorite: boolean;
};

const FavoriteButton = ({ onPress, isFavorite }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      className="mx-1 h-10 w-10 items-center justify-center rounded-full bg-primary"
    >
      <Entypo name="heart" size={25} color={isFavorite ? "red" : "white"} />
    </Pressable>
  );
};

export default FavoriteButton;
