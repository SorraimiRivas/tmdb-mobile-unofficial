import { useEffect, useState } from "react";
import axios from "axios";

import { FormattedPeople, FormattedPeopleDetails } from "@/lib/types";
import { getRequestOptions } from "../api";
import { formatPeople, formattedPeopleDetails } from "@/lib/utils";

const useGetPeopleById = (url: string, params?: {}) => {
  const [data, setData] = useState<Array<FormattedPeopleDetails>>();
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
          ...getRequestOptions,
          url,
          params: {
            ...params,
          },
        });
        const formattedResponse = formattedPeopleDetails(response.data.results);
        setData(formattedResponse);
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

    () => abortSignal.abort;
  }, [url]);

  return { data, loading, error };
};

export default useGetPeopleById;
