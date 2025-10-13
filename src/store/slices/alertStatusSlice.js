import { createSlice } from '@reduxjs/toolkit';
import { alertStatusIndex } from '../thunks/alertStatusThunk.js';
import { processAlertData } from '../../utils/alertDataProcessor.js';

const ITEMS_PER_PAGE = 8;
const ITEMS_TO_LOAD = 4;

const initialState = {
    list: [], 
    filteredList: [], 
    currentView: [], 
    localViewPage: 0,
    loading: false, 
    error: null,
    noMoreApiData: false, 
    noMoreViewData: false, 
};

const alertStatusSlice = createSlice({
    name: 'alertStatus',
    initialState,
    reducers: {
        loadMoreAlerts: (state) => {
            const start = state.currentView.length;
            const newData = state.filteredList.slice(start, start + ITEMS_TO_LOAD);
            if (newData.length > 0) {
                state.currentView = [...state.currentView, ...newData];
                state.localViewPage += 1; 
            }
            if (state.currentView.length >= state.filteredList.length) {
                state.noMoreViewData = true;
            }
        },
    },
    extraReducers: builder => {
        builder
            .addCase(alertStatusIndex.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(alertStatusIndex.fulfilled, (state, action) => {
                const { items: newItems = [], pageNo: fetchedPageNo = 1, totalCount = 0 } = action.payload || {};
                state.list = [...state.list, ...newItems];

                if (newItems.length > 0) {
                    state.currentPage = fetchedPageNo + 1;
                }

                if (newItems.length === 0 || state.list.length >= totalCount) {
                    state.noMoreApiData = true; 
                }

                const { filteredList, currentView } = processAlertData(state.list);

                state.filteredList = filteredList;
                state.currentView = currentView;

                if (state.currentView.length === 0 && filteredList.length > 0) {
                    state.localViewPage = 1;
                    state.noMoreViewData = filteredList.length <= ITEMS_PER_PAGE;
                }

                state.loading = false;
            })
            .addCase(alertStatusIndex.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || action.payload || '데이터 로드 중 오류 발생';
                state.noMoreApiData = true;
            });
    }
});

export const { loadMoreAlerts } = alertStatusSlice.actions;
export default alertStatusSlice.reducer;
