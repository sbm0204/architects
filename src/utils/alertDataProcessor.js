import dayjs from 'dayjs';
import { getRecentOneMonthData } from './dateFilter.js';

export function processAlertData(list, filterMonth) {
    // 1. 최근 filterMonth개월 데이터 필터링
    const filtered = getRecentOneMonthData(list, filterMonth); 

    // 2. 날짜와 시간 기준으로 정렬
    const sortedFiltered = filtered.slice().sort((a, b) => {
        const dateTimeA = `${a.issueDate} ${a.issueTime}`;
        const dateTimeB = `${b.issueDate} ${b.issueTime}`;

        const dateA = dayjs(dateTimeA, 'YYYY-MM-DD HH:mm');
        const dateB = dayjs(dateTimeB, 'YYYY-MM-DD HH:mm');

        if (dateB.isAfter(dateA)) return 1;
        if (dateB.isBefore(dateA)) return -1;

        return b.sn - a.sn;
    });

    // 💡 변경: currentView 반환 로직 제거. 
    // 필터링 및 정렬된 전체 목록만 반환
    return {
        // 이 필터링된 전체 목록이 AlertStatus.jsx의 allAlerts로 사용됨
        filteredList: sortedFiltered, 
        // 🚨 currentView를 제거하거나, filteredList와 동일하게 설정 (Redux에서 처리)
        currentView: sortedFiltered, 
    };
}