import dayjs from 'dayjs';
import { getRecentOneMonthData } from './dateFilter.js';

export function processAlertData(list, filterMonth) {
  const filtered = getRecentOneMonthData(list, filterMonth); 

  const sortedFiltered = filtered.slice().sort((a, b) => {
    const dateTimeA = `${a.issueDate} ${a.issueTime}`;
    const dateTimeB = `${b.issueDate} ${b.issueTime}`;

    const dateA = dayjs(dateTimeA, 'YYYY-MM-DD HH:mm');
    const dateB = dayjs(dateTimeB, 'YYYY-MM-DD HH:mm');

    if (dateB.isAfter(dateA)) return 1;
    if (dateB.isBefore(dateA)) return -1;

    return b.sn - a.sn;
  });

  return {
    filteredList: sortedFiltered, 
    currentView: sortedFiltered, 
  };
}