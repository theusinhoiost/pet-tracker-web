import axios, { type AxiosError, type AxiosRequestConfig } from "axios";

import { cookies } from "next/headers";
import { refreshToken } from "../auth/refresh-token";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type RetryableRequestConfig = AxiosRequestConfig & {
  _retry?: boolean;
};

export const serverApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

serverApi.interceptors.request.use(async (config) => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("__Host-accessToken")?.value;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

serverApi.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableRequestConfig | undefined;

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      await refreshToken();

      const cookieStore = await cookies();

      const newAccessToken = cookieStore.get("__Host-accessToken")?.value;

      if (!newAccessToken) {
        throw new Error("Novo access token não encontrado");
      }

      originalRequest.headers = {
        ...originalRequest.headers,
        Authorization: `Bearer ${newAccessToken}`,
      };

      return serverApi(originalRequest);
    } catch {
      return Promise.reject(error);
    }
  },
);
