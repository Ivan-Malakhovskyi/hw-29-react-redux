import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

import {
  fetchCreateUser,
  fetchDeleteUser,
  fetchToggleStatus,
  fetchUsers,
} from "./operations";

import { addGenericMatcher } from "./genericMatcher";
import { selectFilters } from "./selectors";

//! !id => selectId =(state) => state.bookID

const usersAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const usersSlice = createSlice({
  name: "users",
  initialState: usersAdapter.getInitialState({
    isLoading: false,
    isError: null,
  }),
  extraReducers: (builder) => {
    builder
      //Get All
      .addCase(fetchUsers.fulfilled, (state, action) => {
        usersAdapter.setAll(state, action.payload);
        //  state.byId = {};
        //  state.allIds = [];
        //  action.payload.forEach((user) => {
        //    state.byId[user.id] = user;
        //    state.allIds.push(user.id);
        //  });
      })
      //Create
      .addCase(fetchCreateUser.fulfilled, (state, action) => {
        usersAdapter.addOne(state, action.payload);

        // const user = action.payload;
        // state.byId[user.id] = user;
        // state.allIds.push(user.id);
      })
      // Delete
      .addCase(fetchDeleteUser.fulfilled, (state, action) => {
        usersAdapter.removeOne(state, action.payload.id);

        // const userId = action.payload.id;
        // delete state.byId[userId];
        // state.allIds = state.allIds.filter((id) => id !== userId);
      })
      .addCase(fetchToggleStatus.fulfilled, (state, action) => {
        usersAdapter.upsertOne(state, action.payload);

        // const user = action.payload;
        // if (!state.byId[user.id]) {
        //   state.allIds.push(user.id);
        // }
        // state.byId[user.id] = user;
      });
    addGenericMatcher(builder);
  },
});

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors((state) => state.users);

export const selectVisibleAdapterUsers = createSelector(
  [selectAllUsers, selectFilters],
  (users, filters) => {
    console.log("🚀 ~ selectVisibleAdapterUsers:", Date.now());
    return {
      users: users.filter((user) =>
        user.name.toLowerCase().includes(filters.toLowerCase()),
      ),
      filters,
    };
  },
);

export const usersReducer = usersSlice.reducer;
