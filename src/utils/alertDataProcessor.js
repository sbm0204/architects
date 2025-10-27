// alertDataProcessor.js
import { getRecentOneMonthData } from './dateFilter.js';
import { createDateTimeDescSorter } from './dateSorter.js'; // ✨ 새로 추가

// 날짜/시간 내림차순 정렬 함수 생성 ('issueDate'와 'issueTime' 기준)
const dateTimeSorter = createDateTimeDescSorter('issueDate', 'issueTime');

export function processAlertData(list, filterMonth) {
  const filtered = getRecentOneMonthData(list, filterMonth);

  // slice()로 원본 배열 복사 후 정렬
  const sortedFiltered = filtered.slice().sort((a, b) => {
    const dateTimeCompare = dateTimeSorter(a, b);
    
    // 날짜/시간이 동일하면 sn 내림차순으로 정렬
    if (dateTimeCompare !== 0) {
      return dateTimeCompare;
    }

    return b.sn - a.sn; // sn 내림차순
  });

  return {
    filteredList: sortedFiltered,
    currentView: sortedFiltered,
  };
}