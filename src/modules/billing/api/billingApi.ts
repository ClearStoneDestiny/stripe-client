import { createLogger } from "@utils/logger";
import { API_ENDPOINTS } from "@api/constants/apiEndpoints";
import { apiSlice } from "@api/slices/apiSlice";
import type { ICreateBillingSessionInput } from "@billing/interfaces/iCreateBillingSessionInput";
import type { IPaymentResultEntity } from "@billing/interfaces/iPaymentResultEntity";
import type { IBalanceEntity } from "@billing/interfaces/iBalanceEntity";
import type { ITransactionHistoryEntity } from "@billing/interfaces/iTransactionHistoryEntity";

const logger = createLogger("modules/billing/api/billingApi");

export const billingApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    // Get user balance
    getUserBalance: build.query<IBalanceEntity, void>({
      query: () => ({
        url: API_ENDPOINTS.BILLING.BALANCE,
      }),
      onQueryStarted: async (args, { queryFulfilled }) => {
        try {
          await queryFulfilled;
          logger.info("received getUserBalance");
        } catch (e) {
          const { error } = e as { error: any };
          logger.error("failed to get getUserBalance", {
            context: { status: error?.status, args: JSON.stringify(args) },
          });
        }
      },
      extraOptions: { maxRetries: 2 },
      providesTags: (_result, _error) => [{ type: "Balance" }],
    }),

    // Get transaction history list
    getTransactionHistoryList: build.query<ITransactionHistoryEntity[], void>({
      query: () => ({
        url: API_ENDPOINTS.BILLING.TRANSACTIONS,
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

    // Billing session mutation
    createBillingSession: build.mutation<
      IPaymentResultEntity,
      ICreateBillingSessionInput
    >({
      query: (body) => ({
        url: API_ENDPOINTS.BILLING.SESSION,
        method: "POST",
        body,
      }),
      onQueryStarted: async (args, { queryFulfilled }) => {
        try {
          await queryFulfilled;
          logger.info("received createBillingSession");
        } catch (e) {
          const { error } = e as { error: any };
          logger.error("failed to get createBillingSession", {
            context: { status: error?.status, args: JSON.stringify(args) },
          });
        }
      },
      invalidatesTags: ["Billing"],
    }),
  }),
});

export const {
  useCreateBillingSessionMutation,
  useGetTransactionHistoryListQuery,
  useGetUserBalanceQuery,
} = billingApi;
