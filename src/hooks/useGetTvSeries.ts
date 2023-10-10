import { useEffect, useState } from "react";
import axios from "axios";

import { ISeries, TSeries } from "../lib/types";
import { getRequestOptions } from "../api";
import { formattedSeries } from "@/lib/utils";

export const useGetTvSeries = (url: string, params?: {}) => {
  const [data, setData] = useState<ISeries[]>([]);
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

        const formatSeries = formattedSeries(response.data.results);
        setData(formatSeries);
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
