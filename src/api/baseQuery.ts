import { API_ENDPOINTS } from "@api/constants/apiEndpoints";
import config from "@config/index";
import {
  fetchBaseQuery,
  type BaseQueryApi,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
  type FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query/react";
import qs from "qs";

interface IBaseQueryExtraOptions {
  skipReauth?: boolean;
  skipRedirect?: boolean;
}

const rawBaseQuery = fetchBaseQuery({
  baseUrl: config.URL.BASE_URL,
  credentials: "include",
  paramsSerializer: (params) => {
    return qs.stringify(params, {
      arrayFormat: "repeat",
      skipNulls: true,
    });
  },
});

let refreshTokenPromise: Promise<boolean> | null = null;

const AUTH_ENDPOINTS_WITHOUT_REAUTH = new Set<string>([
  API_ENDPOINTS.AUTH.LOGIN,
  API_ENDPOINTS.AUTH.REFRESH,
  API_ENDPOINTS.AUTH.LOGOUT,
]);

const getRequestUrl = (args: string | FetchArgs) => {
  if (typeof args === "string") {
    return args;
  }

  return args.url;
};

const shouldTryRefresh = (
  args: string | FetchArgs,
  error?: FetchBaseQueryError,
  extraOptions?: IBaseQueryExtraOptions,
) => {
  if (extraOptions?.skipReauth || error?.status !== 401) {
    return false;
  }

  return !AUTH_ENDPOINTS_WITHOUT_REAUTH.has(getRequestUrl(args));
};

const refreshToken = async (
  api: BaseQueryApi,
  extraOptions?: IBaseQueryExtraOptions,
): Promise<boolean> => {
  const result = await rawBaseQuery(
    {
      url: API_ENDPOINTS.AUTH.REFRESH,
      method: "POST",
    },
    api,
    extraOptions ?? {},
  );

  return !result.error;
};

const logout = async (
  api: BaseQueryApi,
  extraOptions?: IBaseQueryExtraOptions,
) => {
  await rawBaseQuery(
    {
      url: API_ENDPOINTS.AUTH.LOGOUT,
      method: "POST",
    },
    api,
    extraOptions ?? {},
  );
};

const handleExpiredToken = async (
  api: BaseQueryApi,
  extraOptions?: IBaseQueryExtraOptions,
): Promise<boolean> => {
  if (!refreshTokenPromise) {
    refreshTokenPromise = refreshToken(api, {
      ...extraOptions,
      skipReauth: true,
    })
      .finally(() => {
        refreshTokenPromise = null;
      });
  }

  const isTokenRefreshed = await refreshTokenPromise;

  if (!isTokenRefreshed) {
    await logout(api, {
      ...extraOptions,
      skipReauth: true,
    });
  }

  return isTokenRefreshed;
};

export const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  IBaseQueryExtraOptions,
  FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (!shouldTryRefresh(args, result.error, extraOptions)) {
    return result;
  }

  const isTokenRefreshed = await handleExpiredToken(api, extraOptions);

  if (isTokenRefreshed) {
    result = await rawBaseQuery(args, api, extraOptions);
  }

  return result;
};
