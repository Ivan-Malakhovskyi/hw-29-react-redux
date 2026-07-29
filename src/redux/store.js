import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from "redux-persist";

import { persistedUsersReducer } from "./users/usersSlice";
import { filterReducer } from "./users/filtersSlice";
import { authReducer } from "./auth/authSlice";

export const store = configureStore({
  reducer: {
    users: persistedUsersReducer,
    filters: filterReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
