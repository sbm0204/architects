import { createSlice } from '@reduxjs/toolkit';
import { alertStatusIndex } from '../thunks/alertStatusThunk.js';
import { processAlertData } from '../../utils/alertDataProcessor.js';

const ITEMS_PER_PAGE = 5; // 💡 한 페이지에 보여줄 날짜 그룹 수 (이전의 DATE_GROUP_INCREMENT 대체)\

const initialState = {
    // API 데이터
    list: [], // API가 불러온 모든 원본 데이터
    filteredList: [], // 기간 필터링/정렬된 최종 목록
    currentPage: 1, // API 요청 시 사용할 페이지 번호
    loading: false, 
    error: null,
    noMoreApiData: false, 
    
    // 💡 페이지네이션 상태
    currentViewPage: 1, // 현재 뷰 페이지 번호 (1부터 시작)
    
    // 기간 필터 상태
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

                // 데이터 초기화
                state.list = []; 
                state.filteredList = [];
                state.currentPage = 1;

                // 💡 뷰 페이지 초기화
                state.currentViewPage = 1; 

                state.noMoreApiData = false; 
                state.loading = true;        
                state.error = null;
            }
        },

        // 💡 새로운 리듀서: 뷰 페이지 변경
        setCurrentViewPage: (state, action) => {
            state.currentViewPage = action.payload;
        },
        
        // 🚨 (기존 increaseDateGroupLimit 리듀서 제거됨)
    },
    extraReducers: (builder) => {
        // API 요청 시작 시
        builder.addCase(alertStatusIndex.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        // API 요청 성공 시
        builder.addCase(alertStatusIndex.fulfilled, (state, action) => {
            const { items: newItems = [], pageNo: fetchedPageNo = 1, totalCount = 0 } = action.payload || {};
            
            // 1. API에서 가져온 새 데이터를 기존 list에 추가하여 누적
            state.list = [...state.list, ...newItems]; 
            
            // 2. 누적된 전체 목록을 기간 필터에 따라 필터링/정렬
            const { filteredList } = processAlertData(state.list, state.filterMonth);
            state.filteredList = filteredList; 

            // 3. 페이지네이션 상태 업데이트
            state.currentPage = fetchedPageNo + 1; 

            // 4. API에서 더 가져올 데이터가 있는지 확인
            if (newItems.length === 0 || state.list.length >= totalCount) {
                state.noMoreApiData = true; 
            }

            state.loading = false;
        });

        // API 요청 실패 시
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