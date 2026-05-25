import { API_ENDPOINTS } from "@api/constants/apiEndpoints";
import { apiSlice } from "@api/slices/apiSlice";
import type {
  IPaginatedResponse,
  IPaginationParams,
} from "@common/index";
import type { IGamesEntity } from "@product/interfaces/iGamesEntity";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    // Get products list
    getProductsList: build.query<
      IPaginatedResponse<IGamesEntity>,
      IPaginationParams
    >({
      query: (params) => ({
        url: API_ENDPOINTS.PRODUCTS.LIST,
        params,
      }),
      extraOptions: { maxRetries: 2 },
      providesTags: (result) =>
        result
          ? [
              // Tag for the entire list
              { type: "Product", id: "LIST" },
              // Tags for each element (to update them individually when editing)
              ...result.items.map(({ id }) => ({
                type: "Product" as const,
                id,
              })),
            ]
          : [{ type: "Product", id: "LIST" }],
    }),
  }),
});

export const { useGetProductsListQuery, useLazyGetProductsListQuery } =
  productApi;
