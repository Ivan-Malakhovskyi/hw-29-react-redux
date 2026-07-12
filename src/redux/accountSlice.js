import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
  name: "account",
  initialState: { balance: 0 },
  reducers: {
    addUser: {
      reducer(state, action) {
        state.balance += action.payload;
      },
      prepare(value) {
        return {
          payload: {
            value,
            id: Date.now(),
          },
        };
      },
    },

    deposit(state, action) {
      state.balance += action.payload;
    },

    withdraw(state, action) {
      state.balance -= action.payload;
    },
  },
});

export const { deposit, withdraw, addUser } = accountSlice.actions;
export const accountReducer = accountSlice.reducer;
