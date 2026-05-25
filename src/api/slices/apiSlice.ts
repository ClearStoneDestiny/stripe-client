import { baseQueryWithRetry } from "@api/baseQueryWithRetry";
import { createApi } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api", // Key in store
  baseQuery: baseQueryWithRetry,
  // Tags for cache invalidation (auto-update data)
  tagTypes: ["User", "Product"],
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}), // Endpoints will be added via injectEndpoints in modules
});
