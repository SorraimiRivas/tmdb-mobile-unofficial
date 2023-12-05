import axios from "axios";
import { useEffect, useState } from "react";

import { getRequestOptions } from "@/api";
import { FormattedMovies, Movie } from "@/lib/types";

import { useAppSelector } from "./useRedux";
import { formattedMoviesArray } from "@/lib/utils";

const useGetUserFavoriteMovies = (content: string) => {
  const [data, setData] = useState<FormattedMovies[]>();
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<boolean>();
  const { account } = useAppSelector((state) => state.userSession);

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
        const formatData = formattedMoviesArray(res.data.results);
        setData(formatData);
        setLoading(false);
      } catch (err: any) {
        console.log(err.message);
        setError(err);
      }
    };
    fecthMovies();

    return () => signal.abort();
  }, []);

  return { data, loading, error };
};

export default useGetUserFavoriteMovies;
