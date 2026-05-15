import { baseQuery } from "@api/baseQuery";
import { retry } from "@reduxjs/toolkit/query/react";

export const baseQueryWithRetry = retry(baseQuery, {
  maxRetries: 0, // By default without retry for safer mutations, include this parameter manually in queries
});
