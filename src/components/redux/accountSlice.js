import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
  name: "account",
  initialState: {
    balance: 0,
  },
  reducers: {
    addUser: {
      reducer(state, action) {
        state.balance = action.payload;
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

    withdraw(state, action) {
      state.balance -= action.payload;
    },
  },
  // reducers: {
  //   deposit(state, action) {
  //     state.balance += action.payload;
  //   },
  //   withdraw(state, action) {
  //     state.balance -= action.payload;
  //   },
  // },
});

export const { deposit, withdraw, addUser } = accountSlice.actions;

// console.log(addUser(10));

export const accountReducer = accountSlice.reducer;
