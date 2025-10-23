import dayjs from 'dayjs';
/**
 * API 응답으로 받은 개별 특보 목록을 '날짜'와 '지역 이름' 기준으로 그룹화합니다.
 *
 * @param {Array<Object>} items - API 응답의 body.items 배열 (개별 특보 항목)
 * @returns {Array<Object>} 그룹화된 특보 목록. 각 요소는 { dataDate, districtName, alerts: [...] } 구조
 */
export const groupAlertsByDateAndDistrict = (items) => {
    if (!items || items.length === 0) {
        return [];
    }

    const groupedMap = items.reduce((acc, item) => {
 // 💡 수정: item.dataDate 대신 item.issueDate 사용 (가정)
        const dateField = item.issueDate; 
        const key = `${dateField}-${item.districtName}`;

        if (!acc[key]) {
            // 새로운 그룹 키인 경우, 초기 구조를 생성합니다.
            acc[key] = {
                dataDate: dateField,
                districtName: item.districtName,
                alerts: [],
            };
        }
        
        // 현재 항목을 해당 그룹의 'alerts' 배열에 추가합니다.
        acc[key].alerts.push(item);
        return acc;
    }, {});

    // Map 객체를 값(Value)만 추출하여 배열로 변환합니다.
    return Object.values(groupedMap).sort((a, b) => {
        const dateA = dayjs(a.dataDate);
        const dateB = dayjs(b.dataDate);
        // 날짜 내림차순 (최신 날짜가 먼저)
        if (dateB.isAfter(dateA)) return 1; 
        if (dateB.isBefore(dateA)) return -1;
        // 같은 날짜면 지역명 오름차순
        return a.districtName.localeCompare(b.districtName);
    });
}

export function groupCardsByDate(cardGroups) {
    const groupedByDate = cardGroups.reduce((acc, card) => {
        const dateKey = card.dataDate; // cardGroups의 각 항목은 dataDate 필드를 가지고 있습니다.
        if (!acc[dateKey]) {
            acc[dateKey] = {
                date: dateKey,
                cards: [] // 해당 날짜에 해당하는 AlertStatusCards 데이터의 배열
            };
        }
        acc[dateKey].cards.push(card);
        return acc;
    }, {});

    // 배열로 변환 후 날짜 내림차순 (최신 날짜가 먼저)으로 정렬합니다.
    return Object.values(groupedByDate).sort((a, b) => {
        const dateA = dayjs(a.date);
        const dateB = dayjs(b.date);
        return dateB.diff(dateA); 
    });
}