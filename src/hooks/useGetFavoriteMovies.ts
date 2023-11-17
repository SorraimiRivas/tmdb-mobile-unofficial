import axios from "axios";
import { useEffect } from "react";
import { getRequestOptions } from "@/api";
import { useAppSelector } from "./useRedux";

const useGetFavoriteMovies = () => {
  const { account } = useAppSelector((state) => state.userSession);

  const accountId = account?.id;

  useEffect(() => {
    const signal = new AbortController();

    const fecthMovies = async () => {
      try {
        const res = await axios.request({
          ...getRequestOptions,
          url: `${accountId}/favorite/movies`,
          params: {},
        });
      } catch (error: any) {
        console.log(error.message);
      }
    };
  }, []);
};
