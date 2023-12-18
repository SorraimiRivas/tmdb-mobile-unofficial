import axios from "axios";
import { useEffect, useState } from "react";

import { useAppSelector } from "./useRedux";

import { getRequestOptions } from "@/api";
import { FormattedMovies, FormattedSeries } from "@/lib/types";
import { formatSeriesArray, formattedMoviesArray } from "@/lib/utils";

const useGetUserFavorites = (content: string) => {
  const [data, setData] = useState<FormattedMovies[] | FormattedSeries[]>();
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<boolean>();
  const { account } = useAppSelector((state) => state.userSession);
  const [fetchTrigger, setFetchTrigger] = useState<boolean>();

  const accountId = account?.id;

  useEffect(() => {
    const signal = new AbortController();

    const fecthMovies = async () => {
      setLoading(true);
      try {
        const res = await axios.request({
          ...getRequestOptions,
          url: `account/${accountId}/favorite/${content}`,
          params: {},
        });
        const formatData =
          content === "tv"
            ? formatSeriesArray(res.data.results)
            : formattedMoviesArray(res.data.results);
        setData(formatData);
        setLoading(false);
      } catch (err: any) {
        console.log(err.message);
        setError(err);
      }
    };
    fecthMovies();

    return () => signal.abort();
  }, [fetchTrigger]);

  const refetchData = () => {
    setFetchTrigger((prev) => !prev);
  };

  return { data, loading, error, refetchData };
};

export default useGetUserFavorites;
