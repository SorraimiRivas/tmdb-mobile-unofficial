import axios from "axios";
import { postRequestOptions } from "@/api";
import { useAppSelector } from "./useRedux";
import { useState } from "react";
import * as Burnt from "burnt";

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
    console.log("trying");

    try {
      const res: Response = await axios.request({
        ...postRequestOptions,
        url: `account/${account?.id}/watchlist`,
        data,
      });
      setError(res.data.status_message);
      setLoading(false);
      // Toast
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
      Burnt.toast({
        title: "Failed",
        preset: "error",
        message: error,
        haptic: "error",
        shouldDismissByDrag: true,
        from: "top",
      });
    }
  };

  return { addWatchlist, error, loading };
};

export default useAddWatchlist;
