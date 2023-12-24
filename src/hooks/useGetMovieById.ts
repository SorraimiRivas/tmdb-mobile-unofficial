import axios from "axios";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

import { requestOptions } from "../api";

import { FormattedMovieDetails } from "@/lib/types";
import { formatMovie } from "@/lib/utils";

export default function useGetMovieById(url: string, params?: object) {
  const [data, setData] = useState<FormattedMovieDetails>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const abortSignal = new AbortController();
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.request({
          ...requestOptions,
          url,
          params: {
            ...params,
          },
        });
        const formattedMovie = formatMovie(response.data);
        setData(formattedMovie);
      } catch (err: any) {
        console.log("Something went wrong please try again", err);
        setError(err);
        Alert.alert("Movies", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    return abortSignal.abort();
  }, [url]);

  return { data, loading, error };
}
