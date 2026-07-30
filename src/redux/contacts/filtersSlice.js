import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: "",
  reducers: {
    changeValueFilter: (state, action) => action.payload,
  },
});

export const { changeValueFilter } = filtersSlice.actions;
export const filterReducer = filtersSlice.reducer;
