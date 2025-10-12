import { configureStore } from "@reduxjs/toolkit";
import alertStatusReducer from "./slices/alertStatusSlice.js";

export default configureStore({
  reducer: {
    alertStatus: alertStatusReducer,
  }
});