import { Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ListButton = () => {
  return (
    <Pressable className="h-10 w-10 items-center justify-center rounded-full bg-primary">
      <MaterialCommunityIcons name="playlist-plus" size={25} color="white" />
    </Pressable>
  );
};

export default ListButton;
