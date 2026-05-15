import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "@config/index";
import qs from "qs";

export const baseQuery = fetchBaseQuery({
  baseUrl: config.URL.BASE_URL,
  credentials: "include",
  paramsSerializer: (params) => {
    return qs.stringify(params, {
      arrayFormat: "repeat",
      skipNulls: true,
    });
  },
});
