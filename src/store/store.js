import { configureStore } from "@reduxjs/toolkit";
import alertStatusReducer from "./slices/alertStatusSlice.js";
import mapAxioReducer from "./slices/mapAxioSlice.js"
import airQualityReducer from "./slices/airQualitySlice.js";

export default configureStore({
  reducer: {
    alertStatus: alertStatusReducer,
    mapAxio: mapAxioReducer,
    airQuality: airQualityReducer,
  }
});