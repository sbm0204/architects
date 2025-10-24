import { createSlice } from '@reduxjs/toolkit';
import { alertStatusIndex } from '../thunks/alertStatusThunk.js';
import { processAlertData } from '../../utils/alertDataProcessor.js';

const ITEMS_PER_PAGE = 5;

const initialState = {
  list: [], 
  filteredList: [], 
  currentPage: 1, 
  loading: false, 
  error: null,
  noMoreApiData: false, 
  currentViewPage: 1, 
  filterMonth: 1, 
  isPeriodSelected: false, 
};

const alertStatusSlice = createSlice({
  name: 'alertStatus',
  initialState,
  reducers: {
    setFilterMonth: (state, action) => {
      if (state.filterMonth !== action.payload || !state.isPeriodSelected) { 
          state.filterMonth = action.payload;
          state.isPeriodSelected = true;
          state.list = []; 
          state.filteredList = [];
          state.currentPage = 1;
          state.currentViewPage = 1; 
          state.noMoreApiData = false; 
          state.loading = true;        
          state.error = null;
      }
    },

    setCurrentViewPage: (state, action) => {
      state.currentViewPage = action.payload;
    },      
  },
  extraReducers: (builder) => {
    builder.addCase(alertStatusIndex.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(alertStatusIndex.fulfilled, (state, action) => {
      const { items: newItems = [], pageNo: fetchedPageNo = 1, totalCount = 0 } = action.payload || {};
      
      state.list = [...state.list, ...newItems]; 
      
      const { filteredList } = processAlertData(state.list, state.filterMonth);
      state.filteredList = filteredList; 

      state.currentPage = fetchedPageNo + 1; 

      if (newItems.length === 0 || state.list.length >= totalCount) {
          state.noMoreApiData = true; 
      }

      state.loading = false;
    });

    builder.addCase(alertStatusIndex.rejected, (state, action) => {
        if (action.payload && action.payload.includes('No more API data to fetch.')) {
            state.error = null; 
        } else {
            state.error = action.payload || '데이터 로드 실패';
        }
        state.loading = false;
    });
  },
});

export const { setFilterMonth, setCurrentViewPage } = alertStatusSlice.actions;
export default alertStatusSlice.reducer;