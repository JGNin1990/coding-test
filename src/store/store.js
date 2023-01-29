import { configureStore } from "@reduxjs/toolkit";
import reportData from "./slicers/reportData";

const store = configureStore({
  reducer: {
    data: reportData,
  },
});
export default store;
