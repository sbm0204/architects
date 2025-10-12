import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosConfig from "../../configs/axioConfigs.js";
import axios from "axios";

const alertStatusIndex = createAsyncThunk(
  'alertStatusSlice/alertStatusIndex',
  async (arg, thunkAPI) => {
    const state = thunkAPI.getState();

    const url = `${axiosConfig.BASE_URL}/UlfptcaAlarmInqireSvc/getUlfptcaAlarmInfo`;
    const config = {
      params: {
        serviceKey: axiosConfig.SERVICE_KEY,
        year: axiosConfig.YEAR,
        numOfRows: axiosConfig.NUM_OF_ROWS,
        pageNo: state.alertStatus.page + 1, 
      }
    }

    const response = await axios.get(url, config);
    return response.data.response.body;
  }
);

export { alertStatusIndex };