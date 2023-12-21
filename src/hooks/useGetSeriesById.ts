import axios from "axios";
import { useEffect, useState } from "react";

import { getRequestOptions } from "@/api";
import { FormattedSeriesDetails } from "@/lib/types";
import { formatSeries } from "@/lib/utils";

const useGetSeriesById = (url: string, params?: object) => {
  const [data, setData] = useState<FormattedSeriesDetails>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const abortSignal = new AbortController();
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
        const formattedSeries = formatSeries(response.data);
        setData(formattedSeries);
      } catch (err: any) {
        console.log("Something went wrong, please try again");
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      abortSignal.abort;
    };
  }, [url]);

  return { data, loading, error };
};

export default useGetSeriesById;
