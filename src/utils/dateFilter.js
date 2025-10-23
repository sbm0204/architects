import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'; 
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'; 

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

/**
 * 주어진 데이터 배열에서 '현재' 시점부터 7개월 이전까지의 데이터만 필터링하여 반환합니다.
 * 데이터 항목은 반드시 'issueDate' 필드를 가지고 있어야 합니다.
 * @param {Array<Object>} allData - 미세먼지 관측 데이터 전체 배열
 * @returns {Array<Object>} 최근 7개월 동안의 데이터 항목 배열
 */
export function getRecentOneMonthData(allData) {
    const today = dayjs().startOf('day')
    const oneMonthAgo = today.subtract(2, 'month').startOf('day');
    
    const filteredData = allData.filter(item => {
        const itemDate = dayjs(item.issueDate).startOf('day');
        
        const isRecentEnough = itemDate.isSameOrAfter(oneMonthAgo, 'day');
        const isNotFuture = itemDate.isSameOrBefore(today, 'day'); 
        
        return isRecentEnough && isNotFuture;
    });

    return filteredData; 
}

/**
 * 현재 날짜를 'YYYY년 MM월 DD일' 형식의 문자열로 반환합니다.
 * @returns {string} 포맷된 현재 날짜
 */
export const getTodayDate = () => {
  // Day.js를 사용하여 현재 날짜를 가져와 원하는 형식으로 포맷합니다.
  const formattedDate = dayjs().format('YYYY.MM.DD');
  return formattedDate;
};