import { useEffect, useState } from "react";
import axios from "axios";
import { getRequestOptions } from "@/api";
import { formatSeries } from "@/lib/utils";
import { FormattedSeriesDetails } from "@/lib/types";

const useGetSeriesById = (url: string, params?: {}) => {
  const [data, setData] = useState<FormattedSeriesDetails>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const abortSignal = new AbortController();

    const fetchData = async () => {
      try {
        const response = await axios.request({
          ...getRequestOptions,
          url,
          params: {
            ...params,
            apiKey: process.env.EXPO_PUBLIC_API_KEY,
          },
        });
        const formattedData = formatSeries(response.data);
        setData(formattedData);
      } catch (err: any) {
        console.log("Something went wrong, please try again");
        setError(err);
      }
      fetchData();
    };

    () => {
      abortSignal.abort;
    };
  }, [url]);

  return { data, loading, error };
};

export default useGetSeriesById;
