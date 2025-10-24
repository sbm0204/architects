import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosConfig from "../../configs/axioConfigs.js";
import axios from "axios";

const alertStatusIndex = createAsyncThunk(
  'alertStatus/fetchAlerts', 
  async (arg, thunkAPI) => {

    const state = thunkAPI.getState();
    const statusState = state.alertStatus;

    if (statusState.noMoreApiData) {
      return thunkAPI.rejectWithValue('No more API data to fetch.'); 
    }

    const currentPage = statusState.currentPage || 0;
    const pageToRequest = currentPage === 0 ? 1 : currentPage;
  
    const url = `${axiosConfig.BASE_URL}/UlfptcaAlarmInqireSvc/getUlfptcaAlarmInfo`; 
    const config = {
      params: {
        serviceKey: axiosConfig.SERVICE_KEY,
        year: axiosConfig.YEAR,
        numOfRows: axiosConfig.NUM_OF_ROWS,
        pageNo: pageToRequest, 
      },
        headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
      validateStatus: (status) => {
        return (status >= 200 && status < 300) || status === 304; 
      }
    }

    try {
        const response = await axios.get(url, config);

      if (response.status === 304) {
          return { items: [], pageNo: pageToRequest, totalCount: statusState.list.length };
      }

        if (!response.data || !response.data.response || !response.data.response.body) {
            return thunkAPI.rejectWithValue('Invalid API response structure.');
      }

        return response.data.response.body;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || '데이터 로드 실패');
    }
  }
);

export { alertStatusIndex };
