import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: "",
  reducers: {
    changeValueFilter() {},
  },
});

export const { changeValueFilter } = filtersSlice.actions;
export const filterReducer = filtersSlice.reducer;
