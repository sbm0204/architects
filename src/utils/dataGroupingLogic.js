import { createDateTimeDescSorter } from './dateSorter.js'; // ✨ 새로 추가

// 날짜 내림차순 정렬 함수 생성 ('dataDate' 기준)
const dateDescSorter = createDateTimeDescSorter('dataDate', null, 'YYYY-MM-DD');

/**
 * API 응답으로 받은 개별 특보 목록을 '날짜'와 '지역 이름' 기준으로 그룹화합니다.
 */
export const groupAlertsByDateAndDistrict = (items) => {
  if (!items || items.length === 0) {
    return [];
  }

  const groupedMap = items.reduce((acc, item) => {
  const dateField = item.issueDate; 
  const key = `${dateField}-${item.districtName}`;

  if (!acc[key]) {
    acc[key] = {
      dataDate: dateField,
      districtName: item.districtName,
      alerts: [],
    };
  }
  
  acc[key].alerts.push(item);
  return acc;
  }, {});

  return Object.values(groupedMap).sort((a, b) => {
    const dateCompare = dateDescSorter(a, b); // ✨ 정렬 함수 사용

    if (dateCompare !== 0) {
      return dateCompare; // 날짜 내림차순
    }

    // 같은 날짜면 지역명 오름차순 (기존 로직 유지)
    return a.districtName.localeCompare(b.districtName); 
  });
}

export function groupCardsByDate(cardGroups) {
  const groupedByDate = cardGroups.reduce((acc, card) => {
    const dateKey = card.dataDate; 
    if (!acc[dateKey]) {
      acc[dateKey] = {
          date: dateKey,
          cards: [] 
      };
    }
    acc[dateKey].cards.push(card);
    return acc;
  }, {});

    // 배열로 변환 후 날짜 내림차순 (최신 날짜가 먼저)으로 정렬합니다.
  return Object.values(groupedByDate).sort((a, b) => {
    // a.date, b.date 필드가 dataDate와 동일하므로 같은 sorter 사용 가능
    return dateDescSorter(a, b); // ✨ 정렬 함수 사용 (dateB.diff(dateA)와 동일 효과)
  });
}