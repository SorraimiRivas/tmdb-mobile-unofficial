import { useEffect, useState } from "react";
import axios from "axios";

import { TSeries } from "../lib/types";
import { getRequestOptions } from "../api";

export const useGetTvSeries = (url: string, params?: {}) => {
  const [data, setData] = useState<TSeries[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  console.log(
    "Running hook from TV Series",
    "URL is: ",
    url,
    "Params are: ",
    params
  );

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
        setData(response.data.results);
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
  }, []);

  return { data, loading, error };
};
