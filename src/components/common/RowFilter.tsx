import { Text, Pressable } from "react-native";

type TRowFilterProps = {
  onPress: () => void;
  selected: boolean;
  label: string;
};

const RowFilter = ({ label, selected, onPress }: TRowFilterProps) => {
  return (
    <Pressable
      className="flex flex-row items-center overflow-hidden rounded-full"
      onPress={onPress}
    >
      <Text
        className={`${
          selected ? "bg-secondary text-white" : "text-gray-600"
        } py-2 px-4 rounded-full`}
      >
        {label}
      </Text>
    </Pressable>
  );
};

export default RowFilter;
