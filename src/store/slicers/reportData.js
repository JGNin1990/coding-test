import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const reportsData = createSlice({
  name: "data",
  initialState,
  reducers: {
    addReports: (state, action) => {
      return (state = [...action.payload]);
    },
  },
});

export const { addReports } = reportsData.actions;
export default reportsData.reducer;
