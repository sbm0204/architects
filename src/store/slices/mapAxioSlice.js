import { createSlice } from "@reduxjs/toolkit";
import { getMapList } from "../thunks/mapAxioThunk";

const mapAxioSlice = createSlice({
  name: 'map',
  initialState: {
    mapList: [],
  },
  reducers: {},
    
  extraReducers: builder => {
    builder
    .addCase(getMapList.pending, (state) => {
      console.log(state, "대기중") //TODO 지워야 함
    })
    .addCase(getMapList.fulfilled, (state, action) => {
      state.mapList = action.payload;
    })
    
    .addCase(getMapList.rejected, (state, action) => {
      console.log(action.payload, "API Axios Error")
    })
  }
});


export default mapAxioSlice.reducer;