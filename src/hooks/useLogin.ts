import { useState } from "react";
import { RequestToken } from "@/lib/types";
import axios from "axios";
import { postRequestOptions, getRequestOptions } from "@/api";
import { Alert } from "react-native";
import { err } from "react-native-svg/lib/typescript/xml";

const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingUserAccount, setLoadingUserAccount] = useState<boolean>(false);
  const [error, setError] = useState("");

  const getRequestToken = async () => {
    console.log("Login Flow Initialized...");
    setLoading(true);
    setError("");
    try {
      const response = await axios.request({
        ...getRequestOptions,
        url: "authentication/token/new",
      });
      // console.log(response.data);
      return response.data.request_token;
    } catch (err: any) {
      Alert.alert(err.message);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const getSessionId = async (token: string | string[]) => {
    setLoadingUserAccount(true);
    setError("");
    console.log("Requesting Session ID with token", token);
    try {
      const response = await axios.request({
        ...postRequestOptions,
        url: "authentication/session/new",
        data: {
          request_token: token,
        },
      });
      console.log(JSON.stringify(response));
      return response.data.session_id;
    } catch (err: any) {
      Alert.alert("Session ID", err.message);
      setError(err.message);
    } finally {
      setLoadingUserAccount(false);
    }
  };

  const getUserAccount = async (validatedToken: string | string[]) => {
    console.log("Requesting User Account with:", validatedToken);
    setLoading(false);
    setLoadingUserAccount(true);
    setError("");
    const sessionId = await getSessionId(validatedToken);
    console.log("ID: ", sessionId);
    try {
      const response = await axios.request({
        ...getRequestOptions,
        url: "account",
        params: {
          session_id: sessionId,
        },
      });
      console.log("Reached here!");
      // console.log(response.data);
    } catch (err: any) {
      Alert.alert(err.message);
    } finally {
      setLoadingUserAccount(false);
    }
  };

  return {
    getRequestToken,
    getUserAccount,
    loading,
    loadingUserAccount,
  };
};

export default useLogin;
