import dayjs from 'dayjs';
import { getRecentOneMonthData } from './dateFilter.js';

// 💡 ITEMS_PER_PAGE 상수 제거

export function processAlertData(list, filterMonth) {
    // 1. 최근 filterMonth개월 데이터 필터링
    const filtered = getRecentOneMonthData(list, filterMonth); 

    // 2. 날짜와 시간 기준으로 정렬 (기존 로직 유지)
    const sortedFiltered = filtered.slice().sort((a, b) => {
        // ... (정렬 로직 유지)
        const dateTimeA = `${a.issueDate} ${a.issueTime}`;
        const dateTimeB = `${b.issueDate} ${b.issueTime}`;

        const dateA = dayjs(dateTimeA, 'YYYY-MM-DD HH:mm');
        const dateB = dayjs(dateTimeB, 'YYYY-MM-DD HH:mm');

        if (dateB.isAfter(dateA)) return 1;
        if (dateB.isBefore(dateA)) return -1;

        return b.sn - a.sn;
    });

    // 3. 💡 초기 뷰 데이터 준비: 제한 없이 필터링된 전체 목록 사용
    const initialData = sortedFiltered; // 💡 .slice(0, ITEMS_PER_PAGE) 제거

    return {
        filteredList: sortedFiltered, // 전체 목록
        currentView: initialData      // 필터링/정렬된 전체 목록
    };
}