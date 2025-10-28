import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosConfig } from "../../configs/axioConfigs.js";
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
      validateStatus: (status) => status >= 200 && status < 300, 
      timeout: 10000,
    }

    try {
        const response = await axios.get(url, config);
        
        if (
        !response.data ||
        typeof response.data !== 'object' ||
        !response.data.response ||
        !response.data.response.body
        ) {
          return thunkAPI.rejectWithValue('Invalid API response structure or non-JSON response.');
        }
        
        const responseData = response.data?.response;
        
        if (responseData.header?.resultCode !== '00') {
          const errorMsg = responseData.header?.resultMsg || 'API 응답 오류 (알 수 없는 코드)';
          return thunkAPI.rejectWithValue(`API 응답 오류: ${errorMsg}`);
        }
        
        return responseData.body;

    } catch (error) {    
      let errorMsg = '데이터 로드 실패: ';
      
       if (axios.isAxiosError(error)) {
        // 타임아웃
        if (error.code === 'ECONNABORTED') {
          errorMsg += '데이터 로드 시간 초과 (10초). 네트워크 연결을 확인하세요.';
        }
        // 서버가 응답을 줬을 때
        else if (error.response) {
          if (error.response.status === 404) {
            errorMsg += '요청 경로 오류 (404 Not Found). API URL을 확인하세요.';
          } else {
            errorMsg += `서버 응답 오류 (${error.response.status}).`;
          }
        }
        // 요청은 갔지만 응답이 없음 (CORS 또는 네트워크 차단)
        else if (error.request) {
          errorMsg += '응답을 받지 못했습니다 (네트워크 또는 CORS 오류).';
        }
        // 요청 자체 실패 (설정 오류 등)
        else {
          errorMsg += `요청 설정 오류: ${error.message}`;
        }
      } else if (error instanceof Error) {
        errorMsg += error.message;
      } else {
        errorMsg += '알 수 없는 오류가 발생했습니다.';
      }
      
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

export { alertStatusIndex };
