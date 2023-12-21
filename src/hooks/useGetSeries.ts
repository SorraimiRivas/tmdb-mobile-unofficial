import axios from "axios";
import { useEffect, useState } from "react";

import { getRequestOptions } from "../api";

import { FormattedSeries } from "@/lib/types";
import { formatSeriesArray } from "@/lib/utils";

export const useGetSeries = (url: string, params?: object) => {
  const [data, setData] = useState<FormattedSeries[]>();
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

        const formatSeries = formatSeriesArray(response.data.results);
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
