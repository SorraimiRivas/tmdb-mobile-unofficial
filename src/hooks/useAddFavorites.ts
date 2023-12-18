import axios from "axios";
import * as Burnt from "burnt";
import { useState } from "react";

import { useAppSelector } from "./useRedux";

import { postRequestOptions } from "@/api";

type PostData = {
  media_type: string;
  media_id: number;
  favorite: boolean;
};

type Response = {
  data: {
    success: true;
    status_code: 1;
    status_message: string;
  };
};

const useFavorites = () => {
  const { account } = useAppSelector((state) => state.userSession);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

  const addFavorite = async (data: PostData) => {
    setLoading(true);
    try {
      const res: Response = await axios.request({
        ...postRequestOptions,
        url: `account/${account?.id}/favorite`,
        data,
      });
      setError(res.data.status_message);
      setLoading(false);
      // Success Toast
      Burnt.toast({
        title: "Success",
        preset: "done",
        message: res.data.status_message,
        haptic: "success",
        duration: 2,
        shouldDismissByDrag: true,
        from: "top",
      });
    } catch (err: any) {
      // Failure Toast
      Burnt.toast({
        title: "Failed",
        preset: "error",
        message: error,
        haptic: "error",
        duration: 2,
        shouldDismissByDrag: true,
        from: "top",
      });
    }
  };

  return { addFavorite, error, loading };
};

export default useFavorites;
