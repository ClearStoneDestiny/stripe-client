import { createLogger } from "@utils/logger";
import { API_ENDPOINTS } from "@api/constants/apiEndpoints";
import { apiSlice } from "@api/slices/apiSlice";
import type { IPaginatedResponse, IPaginationParams } from "@common/index";
import type { IGamesEntity } from "@product/interfaces/iGamesEntity";
import type { ISurpriseCollectionEntity } from "@product/interfaces/iSurpriseCollectionEntity";
import type { IHourPackEntity } from "@product/interfaces/iHourPackEntity";
import type { IGetSubscriptionPlanInput } from "@product/interfaces/iGetSubscriptionPlanInput";
import type { ISubscriptionPlanEntity } from "@product/interfaces/iSubscriptionPlanEntity";

const logger = createLogger("modules/product/api/productApi");

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
      onQueryStarted: async (args, { queryFulfilled }) => {
        try {
          await queryFulfilled;
          logger.info("received getProductsList");
        } catch (e) {
          const { error } = e as { error: any };
          logger.error("failed to get getProductsList", {
            context: { status: error?.status, args: JSON.stringify(args) },
          });
        }
      },
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

    // Get current surprise collection
    getCurrentSurpriseCollection: build.query<ISurpriseCollectionEntity, void>({
      query: () => ({
        url: API_ENDPOINTS.PRODUCTS.SURPRISE_COLLECTION,
      }),
      onQueryStarted: async (args, { queryFulfilled }) => {
        try {
          await queryFulfilled;
          logger.info("received getCurrentSurpriseCollection");
        } catch (e) {
          const { error } = e as { error: any };
          logger.error("failed to get getCurrentSurpriseCollection", {
            context: { status: error?.status, args: JSON.stringify(args) },
          });
        }
      },
      extraOptions: { maxRetries: 2 },
      providesTags: (_result, _error) => [{ type: "SurpriseCollection" }],
    }),

    // Get hour packs
    getHourPacks: build.query<IHourPackEntity[], { activeOnly?: boolean }>({
      query: (params) => ({
        url: API_ENDPOINTS.PRODUCTS.HOUR_PACKS,
        params,
      }),
      onQueryStarted: async (args, { queryFulfilled }) => {
        try {
          await queryFulfilled;
          logger.info("received getHourPacks");
        } catch (e) {
          const { error } = e as { error: any };
          logger.error("failed to get getHourPacks", {
            context: { status: error?.status, args: JSON.stringify(args) },
          });
        }
      },
      extraOptions: { maxRetries: 2 },
      providesTags: (_result, _error) => [{ type: "HourPack" }],
    }),

    // Get subscription plans
    getSubscriptionPlans: build.query<
      ISubscriptionPlanEntity[],
      IGetSubscriptionPlanInput
    >({
      query: (params) => ({
        url: API_ENDPOINTS.PRODUCTS.SUBSCRIPTION_PLANS,
        params,
      }),
      onQueryStarted: async (args, { queryFulfilled }) => {
        try {
          await queryFulfilled;
          logger.info("received getSubscriptionPlans");
        } catch (e) {
          const { error } = e as { error: any };
          logger.error("failed to get getSubscriptionPlans", {
            context: { status: error?.status, args: JSON.stringify(args) },
          });
        }
      },
      extraOptions: { maxRetries: 2 },
      providesTags: (_result, _error) => [{ type: "SubscriptionPlan" }],
    }),
  }),
});

export const {
  useGetProductsListQuery,
  useLazyGetProductsListQuery,
  useGetCurrentSurpriseCollectionQuery,
  useGetHourPacksQuery,
  useGetSubscriptionPlansQuery,
} = productApi;
