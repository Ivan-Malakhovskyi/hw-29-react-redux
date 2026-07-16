import { configureStore } from "@reduxjs/toolkit";
import { accountReducer } from "./accountSlice";
import { localePersistedReducer } from "./localeSlice";
import { usersReducer } from "./users/usersSlice";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

export const store = configureStore({
  reducer: {
    account: accountReducer,
    locale: localePersistedReducer,
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
