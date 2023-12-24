import axios from "axios";
import { useState } from "react";

import { requestOptions } from "@/api";
import { Alert } from "react-native";

const useRating = () => {
  const [loading, setLoading] = useState<boolean>();

  const addRating = async (
    rating: number,
    media_id: number,
    media_type: string,
  ) => {
    setLoading(true);
    const url: string =
      media_type === "tv"
        ? `tv/${media_id}/rating`
        : `movie/${media_id}/rating`;
    try {
      const res = await axios.request({
        ...requestOptions,
        method: "POST",
        url,
        data: {
          value: rating * 2,
        },
      });
      setLoading(false);
    } catch (err: any) {
      console.log("Post Rating", err);
    }
  };

  const removeRating = async (mediaId: number, mediaType: string) => {
    const url: string =
      mediaType === "tv" ? `tv/${mediaId}/rating` : `movie/${mediaId}/rating`;
    try {
      await axios.request({
        ...requestOptions,
        method: "DELETE",
        url,
        data: {
          value: false,
        },
      });
    } catch (err: any) {
      Alert.alert("Rating", err.message);
    }
  };

  return { addRating, removeRating, loading };
};

export default useRating;
