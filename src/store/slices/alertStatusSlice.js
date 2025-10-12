import { createSlice } from '@reduxjs/toolkit';
// import dayjs from 'dayjs'; // 💡 Day.js는 이제 dayjs.js 파일에서 처리
// import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'; 
import { alertStatusIndex } from '../thunks/alertStatusThunk.js';
import { getRecentThreeDaysData } from '../../utils/dayjs.js'; // 💡 분리된 파일에서 함수 Import

const ITEMS_PER_PAGE = 8;
const ITEMS_TO_LOAD = 4;

const initialState = {
    list: [], // 2025년 전체 데이터 (API 요청 결과 원본)
    filteredList: [], // 💡 3일 이내로 필터링된 데이터 (최종 데이터 소스)
    currentView: [], // 사용자에게 보여줄 데이터 (8개 + 4개씩)
    currentPage: 0, // 현재 페이지 인덱스 (0부터 시작)
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

            const nextIndex = state.currentPage * ITEMS_TO_LOAD;

            const newData = state.filteredList.slice(nextIndex, nextIndex + ITEMS_TO_LOAD);

            

            if (newData.length > 0) {

                state.currentView = [...state.currentView, ...newData];

                state.currentPage += 1;

            }



            if (state.currentView.length >= state.filteredList.length) {

                state.noMoreViewData = true;

            }

        },

    },

    extraReducers: builder => {

        builder

            // ... (pending, rejected는 이전과 동일)

            .addCase(alertStatusIndex.pending, (state) => {

                state.loading = true;

                state.error = null;

            })

            .addCase(alertStatusIndex.fulfilled, (state, action) => {

                const { items: { item: newItems = [] } = {} } = action.payload || {};

                

                // 1. API 데이터 합치기

                state.list = [...state.list, ...newItems]; 

                if (newItems.length === 0) {

                    state.noMoreApiData = true;

                }

                

                // 2. 💡 분리된 함수를 사용하여 3일치 데이터 필터링

                const filtered = getRecentThreeDaysData(state.list);

                state.filteredList = filtered;

                

                // 3. 초기 8개 데이터 로드 (currentView가 비어있을 때만 실행)

                if (state.currentView.length === 0 && filtered.length > 0) {

                    const initialData = filtered.slice(0, ITEMS_PER_PAGE);

                    state.currentView = initialData;

                    state.currentPage = 1; 

                    

                    if (filtered.length <= ITEMS_PER_PAGE) {

                         state.noMoreViewData = true;

                    }

                }



                state.loading = false;

            })

            .addCase(alertStatusIndex.rejected, (state, action) => {

                state.loading = false;

                state.error = action.error.message || '데이터 로드 중 오류 발생';

            });

    }

});
export const { loadMoreAlerts } = alertStatusSlice.actions;
export default alertStatusSlice.reducer;