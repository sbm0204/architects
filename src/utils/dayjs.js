import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'; 

dayjs.extend(isSameOrAfter);

/**
 * 주어진 데이터 배열에서 '오늘', '어제', '그제' (최근 3일) 데이터만 필터링하여 반환합니다.
 * 데이터 항목은 반드시 'issueDate' 필드를 가지고 있어야 합니다.
 * * @param {Array<Object>} allData - 미세먼지 관측 데이터 전체 배열
 * @returns {Array<Object>} 최근 3일 동안의 데이터 항목 배열
 */
export function getRecentThreeDaysData(allData) {
  const today = dayjs();
  const twoDaysAgo = today.subtract(2, 'day'); 

  const filteredData = allData.filter(item => {
    // issueDate가 '그제'와 같거나 그 이후인지 (isSameOrAfter) 확인합니다.
    // 'day' 단위를 사용하여 시간은 무시하고 날짜만 비교합니다.
    return dayjs(item.issueDate).isSameOrAfter(twoDaysAgo, 'day');
  });

  return filteredData; 
}