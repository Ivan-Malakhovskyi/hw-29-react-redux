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

import { persistedUsersReducer } from "./contacts/contactsSlice";
import { filterReducer } from "./contacts/filtersSlice";
import { authPersistedReducer } from "./auth/authSlice";

export const store = configureStore({
  reducer: {
    contacts: persistedUsersReducer,
    auth: authPersistedReducer,
    filters: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
