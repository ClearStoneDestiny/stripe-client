import { API_ENDPOINTS } from "@api/constants/apiEndpoints";
import { apiSlice } from "@api/slices/apiSlice";
import type { IGetMeOutput } from "@auth/interfaces/iGetMeOutput";
import type { ILoginInput } from "@auth/interfaces/iLoginInput";
import type { ILoginOutput } from "@auth/interfaces/iLoginOutput";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    // Current user query
    getMe: build.query<IGetMeOutput, void>({
      query: () => API_ENDPOINTS.AUTH.GET_ME,
      providesTags: ["User"],
    }),

    // Login mutation
    login: build.mutation<ILoginOutput, ILoginInput>({
      query: (body) => ({
        url: API_ENDPOINTS.AUTH.LOGIN,
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
      extraOptions: { skipRedirect: true },
    }),

    // Refresh session mutation
    refresh: build.mutation<{ message: string }, void>({
      query: (body) => ({
        url: API_ENDPOINTS.AUTH.REFRESH,
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
      extraOptions: { skipRedirect: true },
    }),

    // Logout mutation
    logout: build.mutation<void, void>({
      query: () => ({
        url: API_ENDPOINTS.AUTH.LOGOUT,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetMeQuery,
  useLoginMutation,
  useRefreshMutation,
  useLogoutMutation,
} = authApi;
