import { createSlice } from '@reduxjs/toolkit';
import { alertStatusIndex } from '../thunks/alertStatusThunk.js';
import { processAlertData } from '../../utils/alertDataProcessor.js';

const initialState = {
    list: [], 
    filteredList: [], 
    currentView: [], 
    localViewPage: 0,
    loading: false, 
    error: null,
    noMoreApiData: false, 
    noMoreViewData: true, 
    filterMonth: 1, // 💡 기본값 1개월 추가
};

const alertStatusSlice = createSlice({
    name: 'alertStatus',
    initialState,
    reducers: {
        setFilterMonth: (state, action) => {
            if (state.filterMonth !== action.payload) {
                state.filterMonth = action.payload;
                // 기간이 변경되면 모든 데이터를 초기화하고 API를 다시 호출합니다.
                state.list = []; 
                state.filteredList = []; 
                state.currentView = []; 
                state.localViewPage = 0;
                state.noMoreApiData = false; 
                state.noMoreViewData = true; // 💡 '더 보기' 비활성화
                state.loading = true;
                state.error = null;
            }
        },
    },
    extraReducers: builder => {
        builder
            .addCase(alertStatusIndex.pending, (state) => {
                state.loading = true;
                state.error = null;
                // API 재요청 시점마다 currentView 초기화 방지 (loadMore 시에도 pending이 발생하기 때문)
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

                // 💡 processAlertData 호출 시, 모든 데이터를 initialData에 담도록 변경됨
                const { filteredList, currentView } = processAlertData(state.list, state.filterMonth); 

                state.filteredList = filteredList;
                state.currentView = currentView; // 💡 필터링된 모든 데이터가 여기에 들어감
                
                // 💡 더 이상 뷰 레벨의 페이징이 없으므로 항상 true로 설정
                state.noMoreViewData = true; 

                state.loading = false;
            })
            .addCase(alertStatusIndex.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || action.payload || '데이터 로드 중 오류 발생';
                state.noMoreApiData = true;
                state.noMoreViewData = true; // 💡 오류 시에도 '더 보기' 비활성화
            });
    }
});

export const { loadMoreAlerts, setFilterMonth } = alertStatusSlice.actions; // setFilterMonth 내보내기
export default alertStatusSlice.reducer;