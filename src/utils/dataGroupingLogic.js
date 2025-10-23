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
        const key = `${item.dataDate}-${item.districtName}`;

        if (!acc[key]) {
            // 새로운 그룹 키인 경우, 초기 구조를 생성합니다.
            acc[key] = {
                dataDate: item.dataDate,
                districtName: item.districtName,
                alerts: [],
            };
        }
        
        // 현재 항목을 해당 그룹의 'alerts' 배열에 추가합니다.
        acc[key].alerts.push(item);
        
        return acc;
    }, {});

    // Map 객체를 값(Value)만 추출하여 배열로 변환합니다.
    const groupedArray = Object.values(groupedMap);

    // (선택 사항) 최신 날짜 순으로 카드 배열을 정렬
    groupedArray.sort((a, b) => {
        // dataDate를 기준으로 내림차순 정렬 (최신 날짜가 앞으로)
        if (a.dataDate > b.dataDate) return -1;
        if (a.dataDate < b.dataDate) return 1;
        return 0;
    });

    return groupedArray;
};