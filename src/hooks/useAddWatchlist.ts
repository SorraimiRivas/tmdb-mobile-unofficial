import axios from "axios";
import { postRequestOptions } from "@/api";
import { useAppSelector } from "./useRedux";
import { useState } from "react";
import { Alert } from "react-native";

type PostData = {
  media_type: string;
  media_id: number;
  watchlist: boolean;
};

type Response = {
  data: {
    success: true;
    status_code: 1;
    status_message: string;
  };
};

const useAddWatchlist = () => {
  const { account } = useAppSelector((state) => state.userSession);
  const [success, setSuccess] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

  const addWatchlist = async (data: PostData) => {
    setLoading(true);
    try {
      const res: Response = await axios.request({
        ...postRequestOptions,
        url: `account/${account?.id}/watchlist`,
        data,
      });
      setLoading(false);
      setSuccess(res.data.success);
      Alert.alert(res.data.status_message);
    } catch (err: any) {
      setError(err);
      console.log(err.message);
    }
  };

  return { addWatchlist, error, loading };
};

export default useAddWatchlist;
