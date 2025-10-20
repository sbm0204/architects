import dayjs from 'dayjs';
import { getRecentOneMonthData } from './dateFilter.js';

const ITEMS_PER_PAGE = 10;

export function processAlertData(list) {
    // 1. 최근 1개월 데이터 필터링
    const filtered = getRecentOneMonthData(list);

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

    // 3. 초기 뷰 데이터 준비
    const initialData = sortedFiltered.slice(0, ITEMS_PER_PAGE);

    return {
        filteredList: sortedFiltered,
        currentView: initialData
    };
}

export function getInitialViewData(sortedFiltered) {
    const initialData = sortedFiltered.slice(0, ITEMS_PER_PAGE);
    return {
        currentView: initialData,
        localViewPage: 1
    };
}
