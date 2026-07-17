import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: "",
  reducers: {
    filterByName(state, action) {
      return action.payload;
    },
  },
});

export const { filterByName } = filtersSlice.actions;
export const filterReducer = filtersSlice.reducer;
