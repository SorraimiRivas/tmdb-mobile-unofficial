import { useEffect, useState } from "react";
import axios from "axios";

import { FormattedMovies } from "../lib/types";
import { getRequestOptions } from "../api";
import { formattedMoviesArray } from "@/lib/utils";

export const useGetMovies = (url: string, params?: {}) => {
  const [data, setData] = useState<FormattedMovies[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const isError = (err: unknown): err is Error => err instanceof Error;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.request({
          ...getRequestOptions,
          url,
          params: {
            ...params,
          },
        });

        const formatMovies = formattedMoviesArray(response.data.results);
        setData(formatMovies);
      } catch (err) {
        if (isError(err)) {
          console.log(err.message);
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};
