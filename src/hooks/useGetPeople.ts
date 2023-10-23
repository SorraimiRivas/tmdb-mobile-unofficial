import { useEffect, useState } from "react";
import axios from "axios";

import { FormattedPeople } from "@/lib/types";
import { getRequestOptions } from "../api";
import { formatPeople } from "@/lib/utils";

const useGetPeople = (url: string, page: number) => {
  const [data, setData] = useState<Array<FormattedPeople>>([]);
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

    () => abortSignal.abort;
  }, [page]);

  return { data, loading, error };
};

export default useGetPeople;
