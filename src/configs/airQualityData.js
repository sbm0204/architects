export const AIR_QUALITY_DATA = {
  "response": {
    "header": { "resultCode": "00", "resultMsg": "NORMAL_CODE" },
    "body": {
      "items": [
        // dataDate를 현재 연도로 업데이트하여 3일 필터를 통과하도록 조정
        { "clearVal": "28", "sn": "262", "districtName": "경기", "dataDate": "2025-10-12", "issueVal": "76", "issueTime": "03:00", "clearDate": "2025-10-12", "issueDate": "2025-10-12", "moveName": "남부권", "clearTime": "13:00", "issueGbn": "주의보", "itemCode": "PM25" },
        { "clearVal": "66", "sn": "156", "districtName": "전북", "dataDate": "2025-10-12", "issueVal": "166", "issueTime": "15:00", "clearDate": "2025-10-12", "issueDate": "2025-10-12", "moveName": "정읍권역", "clearTime": "17:00", "issueGbn": "주의보", "itemCode": "PM10" },
        { "clearVal": "35", "sn": "123", "districtName": "서울", "dataDate": "2025-10-11", "issueVal": "85", "issueTime": "08:30", "clearDate": "2025-10-11", "issueDate": "2025-10-11", "moveName": "도심권", "clearTime": "16:00", "issueGbn": "주의보", "itemCode": "PM25" },
        { "clearVal": "45", "sn": "345", "districtName": "대전", "dataDate": "2025-10-11", "issueVal": "180", "issueTime": "11:00", "clearDate": "2025-10-11", "issueDate": "2025-10-11", "moveName": "동부권", "clearTime": "09:00", "issueGbn": "경보", "itemCode": "PM10" },
        { "clearVal": "22", "sn": "456", "districtName": "대구", "dataDate": "2025-10-10", "issueVal": "78", "issueTime": "10:00", "clearDate": "2025-10-10", "issueDate": "2025-10-10", "moveName": "달서구권", "clearTime": "15:30", "issueGbn": "주의보", "itemCode": "PM25" },
        { "clearVal": "45", "sn": "345", "districtName": "대전", "dataDate": "2025-10-11", "issueVal": "180", "issueTime": "11:00", "clearDate": "2025-10-11", "issueDate": "2025-10-11", "moveName": "동부권", "clearTime": "11:00", "issueGbn": "경보", "itemCode": "PM10" },
        { "clearVal": "45", "sn": "345", "districtName": "대전", "dataDate": "2025-10-11", "issueVal": "180", "issueTime": "11:00", "clearDate": "2025-10-11", "issueDate": "2025-10-11", "moveName": "동부권", "clearTime": "10:00", "issueGbn": "경보", "itemCode": "PM10" },
        { "clearVal": "45", "sn": "345", "districtName": "대전", "dataDate": "2025-10-11", "issueVal": "180", "issueTime": "11:00", "clearDate": "2025-10-11", "issueDate": "2025-10-11", "moveName": "동부권", "clearTime": "14:00", "issueGbn": "경보", "itemCode": "PM10" },
        { "clearVal": "45", "sn": "345", "districtName": "대전", "dataDate": "2025-10-11", "issueVal": "180", "issueTime": "11:00", "clearDate": "2025-10-11", "issueDate": "2025-10-11", "moveName": "동부권", "clearTime": "16:00", "issueGbn": "경보", "itemCode": "PM10" },
        { "clearVal": "45", "sn": "345", "districtName": "대전", "dataDate": "2025-10-11", "issueVal": "180", "issueTime": "11:00", "clearDate": "2025-10-11", "issueDate": "2025-10-11", "moveName": "동부권", "clearTime": "18:00", "issueGbn": "경보", "itemCode": "PM10" },
      ],
      "numOfRows": 100, "pageNo": 1, "totalCount": 5
    }
  }
};
export const AIR_QUALITY_ITEMS = AIR_QUALITY_DATA.response.body.items;
