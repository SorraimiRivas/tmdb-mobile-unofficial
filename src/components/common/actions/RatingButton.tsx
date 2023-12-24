import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert, Pressable, View } from "react-native";
import Popover from "react-native-popover-view/dist/Popover";
import StarRating from "react-native-star-rating-widget";

import useGetAccountStates from "@/hooks/useGetItemState";
import useRating from "@/hooks/useRating";
import { useAppSelector } from "@/hooks/useRedux";

type RatingButtonProps = {
  media_id: number;
  media_type: string;
};

// TODO: fix snake_case to be camelCase
const RatingButton = ({ media_id, media_type }: RatingButtonProps) => {
  const router = useRouter();
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [isRated, setIsRated] = useState<boolean>(false);
  const { refetchItemState, rating } = useGetAccountStates(
    media_id,
    media_type,
  );
  const { isLogged } = useAppSelector((state) => state.userSession);

  const { addRating, removeRating } = useRating();

  const handleRating = useCallback(() => {
    if (!isLogged) {
      Alert.alert("Message", "You need to login to perfom this action", [
        {
          text: "Cancel",
          style: "destructive",
          onPress: () => setSelectedRating(0),
        },
        {
          text: "Login",
          onPress: () => router.push("/login/"),
          style: "default",
        },
      ]);
    } else {
      setIsRated(!isRated);
      addRating(selectedRating, media_id, media_type);
      refetchItemState();
    }
  }, [selectedRating]);

  const handleRemoveRating = () => {
    if (isLogged) {
      setSelectedRating(0);
      setIsRated(false);
      removeRating(media_id, "media_type");
      refetchItemState();
    } else {
      Alert.alert("Message", "You need to login to perfom this action", [
        {
          text: "Cancel",
          style: "destructive",
          onPress: () => setSelectedRating(0),
        },
        {
          text: "Login",
          onPress: () => router.push("/login/"),
          style: "default",
        },
      ]);
    }
  };

  useEffect(() => {
    if (!rating) {
      setSelectedRating(0);
    } else {
      setSelectedRating(rating / 2);
    }
  }, [rating]);

  return (
    <Popover
      from={
        <Pressable className="h-10 w-10 items-center justify-center rounded-full bg-primary">
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
