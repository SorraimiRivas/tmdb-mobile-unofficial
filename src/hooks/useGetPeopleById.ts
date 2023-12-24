import axios from "axios";
import { useEffect, useState } from "react";

import { requestOptions } from "../api";

import { FormattedPeopleDetails } from "@/lib/types";
import { formatPeopleDetails } from "@/lib/utils";
import { Alert } from "react-native";

const useGetPeopleById = (url: string, params?: object) => {
  const [data, setData] = useState<FormattedPeopleDetails>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const isError = (err: unknown): err is Error => err instanceof Error;

  useEffect(() => {
    const abortSignal = new AbortController();
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.request({
          ...requestOptions,
          url,
          params: {
            ...params,
          },
        });
        const formattedResponse = formatPeopleDetails(response.data);
        setData(formattedResponse);
      } catch (err) {
        if (isError(err)) {
          console.log(err.message);
          setError(err.message);
          Alert.alert("People", err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    return abortSignal.abort();
  }, [url]);

  return { data, loading, error };
};

export default useGetPeopleById;
