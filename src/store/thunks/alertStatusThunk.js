import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosConfig from "../../configs/axioConfigs.js";
import axios from "axios";

const alertStatusIndex = createAsyncThunk(
  'alertStatus/fetchAlerts', 
  async (arg, thunkAPI) => {

    const state = thunkAPI.getState();
    const currentPage = state.alertStatus.currentPage || 0;
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
          return status >= 200 && status < 300; 
        }
      }

      try {
          const response = await axios.get(url, config);

          return response.data.response.body;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || '데이터 로드 실패');
    }
   }
);


export { alertStatusIndex };
