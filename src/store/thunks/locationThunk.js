import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosConfig from "../../configs/axioConfigs"
import axios from "axios";

const getLocation = createAsyncThunk(
  'location/getLocation',
  async ({ lat, lon }) => {
    
    const url = `${axiosConfig.BASE_URL}/MsrstnInfoInqireSvc/getNearbyMsrstnList`;
    
    const config = {
      params: {
        serviceKey: axiosConfig.SERVICE_KEY,
        ver: 1.0,
        tmX: lon,
        tmY: lat
      }
    }
 
    const response = await axios.get(url, config);
    
    return response.data.response.body;
  }
);

export { getLocation };