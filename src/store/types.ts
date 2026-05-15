import { setupStore, store } from "./store";

export type RootStateType = ReturnType<typeof store.getState>;
export type AppStoreType = ReturnType<typeof setupStore>;
export type AppDispatchType = typeof store.dispatch;
