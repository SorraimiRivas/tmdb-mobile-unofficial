import axios from "axios";
import { useState } from "react";
import { Alert } from "react-native";

import { useAppDispatch, useAppSelector } from "./useRedux";

import { requestOptions } from "@/api";
import { setAccount, setSession } from "@/redux/sessionSlice";

const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [loadingUserAccount, setLoadingUserAccount] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { session_id } = useAppSelector((state) => state.userSession);

  /**
   * Gets a request token to validate and use it to obtain a session id
   * @returns
   */
  const getRequestToken = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.request({
        ...requestOptions,
        method: "GET",
        url: "authentication/token/new",
      });
      return response.data.request_token;
    } catch (err: any) {
      Alert.alert(err.message);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Takes an authorized token to get a session id to use it to get a user account
   * @param token
   * @returns
   */
  const getSessionId = async (token: string | string[]) => {
    setLoadingUserAccount(true);
    setError("");
    try {
      const response = await axios.request({
        ...requestOptions,
        method: "GET",
        url: "authentication/session/new",
        data: {
          request_token: token,
        },
      });
      dispatch(setSession(response.data));
      return response.data.session_id;
    } catch (err: any) {
      Alert.alert("Session ID", err.message);
      setError(err.message);
    } finally {
      setLoadingUserAccount(false);
    }
  };

  /**
   * Gets a user account validated via TMDB webpage using a request token and a session id then saves the account using SecureStore
   * @param validatedToken
   */
  const getUserAccount = async (validatedToken: string | string[]) => {
    setLoading(false);
    setLoadingUserAccount(true);
    setError("");
    const sessionId = await getSessionId(validatedToken);
    try {
      const response = await axios.request({
        ...requestOptions,
        method: "GET",
        url: "account",
        params: {
          session_id: sessionId,
        },
      });
      dispatch(setAccount(response.data));
    } catch (err: any) {
      Alert.alert(err.message);
    } finally {
      setLoadingUserAccount(false);
    }
  };

  const isAuth = () => {
    return session_id !== "";
  };

  return {
    getRequestToken,
    getUserAccount,
    loading,
    loadingUserAccount,
    isAuth,
    error,
  };
};

export default useLogin;
