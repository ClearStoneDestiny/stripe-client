import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "@api/slices/apiSlice";
import { apiErrorMiddleware } from "@api/middlewares/apiErrorMiddleware";

// Root reducer (required for setupStore)
const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
});

// Function to create store (use in a tests)
export const setupStore = (preloadedState?: any) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(apiSlice.middleware)
        .concat(apiErrorMiddleware),
    preloadedState,
  });
};

// Main store for app
export const store = setupStore();

if (import.meta.hot) {
  import.meta.hot.accept(() => {
    // When updating HMR, reset the API state
    store.dispatch(apiSlice.util.resetApiState());
  });
}
