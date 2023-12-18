import axios from "axios";
import { useState } from "react";

import { postRequestOptions } from "@/api";

type Rating = number | false;

const useRating = () => {
  const [loading, setLoading] = useState<boolean>();

  const addRating = async (
    rating: Rating,
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
        ...postRequestOptions,
        url,
        data: {
          value: rating,
        },
      });
      console.log(res.data.success);

      setLoading(false);
    } catch (err: any) {
      console.log(err);
    }
  };

  return { addRating, loading };
};

export default useRating;
