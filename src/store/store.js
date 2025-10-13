import { configureStore } from "@reduxjs/toolkit";
import alertStatusReducer from "./slices/alertStatusSlice.js";
import mapAxioReducer from "./slices/mapAxioSlice.js"

export default configureStore({
  reducer: {
    alertStatus: alertStatusReducer,
    mapAxio: mapAxioReducer,
  }
});