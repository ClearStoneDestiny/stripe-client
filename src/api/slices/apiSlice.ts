import { baseQuery } from "@api/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api", // Key in store
  baseQuery: baseQuery,
  // Tags for cache invalidation (auto-update data)
  tagTypes: ["User"],
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}), // Endpoints will be added via injectEndpoints in modules
});
