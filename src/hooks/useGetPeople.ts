import axios from "axios";
import { useEffect, useState } from "react";

import { getRequestOptions } from "../api";

import { FormattedPeople } from "@/lib/types";
import { formatPeople } from "@/lib/utils";

const useGetPeople = (url: string, page: number) => {
  const [data, setData] = useState<FormattedPeople[]>([]);
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
            page,
          },
        });
        const formattedResponse = formatPeople(response.data.results);
        setData([...data, ...formattedResponse]);
      } catch (err) {
        if (isError(err)) {
          console.log(err.message);
          setError(err.message);
        }
      } finally {
        setLoading((prev) => !prev);
      }
    };
    fetchData();

    return abortSignal.abort();
  }, [page]);

  return { data, loading, error };
};

export default useGetPeople;
