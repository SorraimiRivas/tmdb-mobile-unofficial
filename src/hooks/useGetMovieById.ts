import { useEffect, useState } from "react";
import { getRequestOptions } from "../api";
import axios from "axios";
import { FormattedMovieDetails } from "@/lib/types";
import { formatMovie } from "@/lib/utils";

export default function useGetMovieById(url: string, params?: {}) {
  const [data, setData] = useState<FormattedMovieDetails>();
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
            apiKey: process.env.EXPO_PUBLIC_API_KEY,
          },
        });

        const formattedMovie = formatMovie(response.data);
        setData(formattedMovie);
      } catch (err: any) {
        console.log("Something went wrong please try again", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      abortSignal.abort;
    };
  }, []);

  return { data, loading, error };
}
