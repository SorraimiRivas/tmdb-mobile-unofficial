import { useCallback, useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Pressable, View } from "react-native";

import Popover from "react-native-popover-view/dist/Popover";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import StarRating from "react-native-star-rating-widget";

import useGetAccountStates from "@/hooks/useGetItemState";
import useRating from "@/hooks/useRating";

type RatingButtonProps = {
  media_id: number;
  media_type: string;
};

const RatingButton = ({ media_id, media_type }: RatingButtonProps) => {
  const [selectedRating, setSelectedRating] = useState<number | false>(0);
  const [isRated, setIsRated] = useState<boolean>(false);
  const { refetchItemState, rating } = useGetAccountStates(
    media_id,
    media_type,
  );

  const { addRating } = useRating();

  const handleRating = useCallback(() => {
    setIsRated(!isRated);
    addRating(
      !selectedRating ? false : selectedRating * 2,
      media_id,
      media_type,
    );
    refetchItemState();
  }, [selectedRating]);

  const handleRemoveRating = () => {
    setSelectedRating(0);
    setIsRated(false);
    handleRating();
    refetchItemState();
  };

  useEffect(() => {
    if (!rating) {
      setSelectedRating(rating!);
    } else {
      setSelectedRating(rating / 2);
    }
  }, [rating]);

  return (
    <Popover
      from={
        <Pressable className="mx-1 h-10 w-10 items-center justify-center rounded-full bg-primary">
          <FontAwesome
            name="star"
            size={25}
            color={rating && rating > 0 ? "#FFD700" : "white"}
          />
        </Pressable>
      }
      popoverStyle={{
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 10,
        backgroundColor: "#0d253f",
        marginRight: 10,
      }}
    >
      <View className="flex flex-row items-center gap-2">
        {/* TODO: Fix *remove rating functionality* */}
        <MaterialCommunityIcons
          name="minus-circle-outline"
          size={30}
          color="white"
          onPress={handleRemoveRating}
        />
        <StarRating
          rating={!selectedRating ? 0 : selectedRating}
          onChange={(rating: number) => setSelectedRating(rating)}
          color="gold"
          emptyColor="white"
          enableHalfStar
          enableSwiping
          maxStars={5}
          starSize={35}
          onRatingEnd={handleRating}
        />
      </View>
    </Popover>
  );
};

export default RatingButton;
