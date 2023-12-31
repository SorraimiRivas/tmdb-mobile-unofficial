import axios from "axios";
import { useEffect, useState } from "react";

import { useAppSelector } from "./useRedux";

import { getRequestOptions } from "@/api";

type AccountState = {
  id: number;
  favorite: boolean;
  rated: {
    value: number | false;
  };
  watchlist: false;
};

const useGetAccountStates = (id: number, media_type: string) => {
  const [data, setData] = useState<AccountState>();
  const [rating, setRating] = useState<number | false>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [trigger, setTrigger] = useState<boolean>(false);

  const session = useAppSelector((state) => state.userSession);

  const url =
    media_type === "tv"
      ? `tv/${id}/account_states`
      : `movie/${id}/account_states`;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.request({
          ...getRequestOptions,
          url,
          params: {
            session_id: session.session_id,
          },
        });
        setData(res.data);
        setRating(res.data.rated.value!);
        setLoading(false);
      } catch (err) {
        setError(err);
        console.log(err);
      }
    };

    fetchData();
  }, [id, trigger]);

  const refetchItemState = () => {
    if (!loading) {
      setTrigger((prev) => !prev);
    }
  };

  return { data, loading, error, rating, refetchItemState };
};

export default useGetAccountStates;
