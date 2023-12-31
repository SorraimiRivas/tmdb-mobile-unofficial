import axios from "axios";
import { useState } from "react";

import { useAppSelector } from "./useRedux";

import { postRequestOptions } from "@/api";

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
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

  const addWatchlist = async (data: PostData) => {
    setLoading(true);
    console.log("trying");

    try {
      const res: Response = await axios.request({
        ...postRequestOptions,
        url: `account/${account?.id}/watchlist`,
        data,
      });
      setError(res.data.status_message);
      setLoading(false);
    } catch (err: any) {
      console.log(err);
    }
  };

  return { addWatchlist, error, loading };
};

export default useAddWatchlist;
