import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'; 

dayjs.extend(customParseFormat);

/**
 * 두 항목의 날짜/시간 문자열을 비교하여 내림차순(최신 순)으로 정렬하는 함수를 생성합니다.
 * @param {string} dateFieldKey - 날짜 필드 이름 (예: 'issueDate', 'dataDate')
 * @param {string} [timeFieldKey] - 시간 필드 이름 (옵션, issueDate와 issueTime처럼 분리된 경우)
 * @param {string} [format] - 날짜/시간 문자열의 Day.js 파싱 포맷 (timeFieldKey가 있으면 'YYYY-MM-DD HH:mm'를 기본값으로 사용)
 * @returns {function(Object, Object): number} 정렬 비교 함수
 */
export function createDateTimeDescSorter(dateFieldKey, timeFieldKey = null, format = 'YYYY-MM-DD') {
  const dateTimeFormat = timeFieldKey ? 'YYYY-MM-DD HH:mm' : format;

  return (a, b) => {
    // 1. 날짜/시간 문자열 조합
    const dateTimeA = timeFieldKey 
      ? `${a[dateFieldKey]} ${a[timeFieldKey]}` 
      : a[dateFieldKey];
    const dateTimeB = timeFieldKey 
      ? `${b[dateFieldKey]} ${b[timeFieldKey]}` 
      : b[dateFieldKey];

    // 2. Day.js 객체로 파싱
    const dateA = dayjs(dateTimeA, dateTimeFormat);
    const dateB = dayjs(dateTimeB, dateTimeFormat);

    // 3. 내림차순 정렬 로직 (B가 A보다 이후이면 1 반환)
    if (dateB.isAfter(dateA)) return 1;
    if (dateB.isBefore(dateA)) return -1;
    
    // 날짜/시간이 동일한 경우 0 반환 (후순위 정렬 로직은 개별 모듈에서 처리)
    return 0; 
  };
}