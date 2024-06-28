import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { refreshAuth } from "./refreshAuth";
import { useAuthStore } from "@/store/auth";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const client = axios.create({
  baseURL,
  withCredentials: true,
});

export const setTokenToRequestHeader = (token: string) => {
  client.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const removeTokenFromRequestHeader = () => {
  delete client.defaults.headers.common.Authorization;
};

createAuthRefreshInterceptor(client, refreshAuth, {
  statusCodes: [403],
  pauseInstanceWhileRefreshing: true,
});

export const request = ({ ...options }) => {
  const accessToken = useAuthStore.getState().accessToken;
  client.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  return client(options);
};
