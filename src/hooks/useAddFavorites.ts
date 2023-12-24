import axios from "axios";
import { useState } from "react";

import { useAppSelector } from "./useRedux";

import { requestOptions } from "@/api";
import { Alert } from "react-native";

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
        ...requestOptions,
        url: `account/${account?.id}/favorite`,
        data,
      });
      setError(res.data.status_message);
      setLoading(false);
    } catch (err: any) {
      console.log(err);
      Alert.alert("Add Favorites", err.message);
    }
  };

  return { addFavorite, error, loading };
};

export default useFavorites;
