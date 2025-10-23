import { createSlice } from "@reduxjs/toolkit";
import { getAirQuality } from "../thunks/airQualityThunk";

const airQualitySlice = createSlice({
  name: 'airQuality',
  initialState: {
    airQuality: null,
    status: 'idle',
  },
  reducers: {},
    
  extraReducers: builder => {
    builder
    .addCase(getAirQuality.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(getAirQuality.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.airQuality = action.payload;
    })
    .addCase(getAirQuality.rejected, (state, action) => {
      state.status = 'failed';
      console.log(action.payload, "AirQuality API Axios Error");
    })
  }
});

export default airQualitySlice.reducer;
