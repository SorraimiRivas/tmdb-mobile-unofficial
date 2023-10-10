import { useEffect, useState } from "react";
import { getRequestOptions } from "../api";
import axios from "axios";
import { TMovie } from "../lib/types";

export default function useMovie(url: string, params: {}) {
  const [data, setData] = useState<TMovie>();
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<string>("");

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
        setData(response.data);
      } catch (err: any) {
        console.log("Something went wrong please try again", err);
      }
    };

    fetchData();

    return () => {
      abortSignal.abort;
    };
  }, []);

  return { data, loading, error };
}
