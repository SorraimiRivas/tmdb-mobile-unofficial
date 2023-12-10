import axios from "axios";
import { useEffect, useState } from "react";
import { getRequestOptions } from "@/api";
import { useAppSelector } from "./useRedux";

type Response = {
  id: number;
  favorite: boolean;
  rated: {
    value: number;
  };
  watchlist: false;
};

const useGetAccountStates = (id: number, media_type: string) => {
  const [data, setData] = useState<Response>();
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
        console.log(res.data);
        setData(res.data);
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

  return { data, loading, error, refetchItemState };
};

export default useGetAccountStates;
