import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable } from "react-native";

const ListButton = () => {
  return (
    <Pressable className="mx-1 h-10 w-10 items-center justify-center rounded-full bg-primary">
      <MaterialCommunityIcons name="playlist-plus" size={25} color="white" />
    </Pressable>
  );
};

export default ListButton;
