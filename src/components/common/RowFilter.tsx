import { Text, Pressable } from "react-native";

type RowFilterProps = {
  onPress: () => void;
  selected: boolean;
  label: string;
};

const RowFilter = ({ label, selected, onPress }: RowFilterProps) => {
  return (
    <Pressable
      className="flex flex-row items-center overflow-hidden rounded-full"
      onPress={onPress}
    >
      <Text
        className={`${
          selected ? "bg-secondary font-bold text-white" : "text-gray-600"
        } rounded-full px-4 py-2`}
      >
        {label}
      </Text>
    </Pressable>
  );
};

export default RowFilter;
