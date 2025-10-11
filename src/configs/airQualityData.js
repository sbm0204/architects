export const AIR_QUALITY_DATA = {

  "response": {
    "header": {
      "resultCode": "00",
      "resultMsg": "NORMAL_CODE"
    },
    "body": {
      "items": [
        {
          "clearVal": "28",
          "sn": "262",
          "districtName": "경기",
          "dataDate": "2020-10-28",
          "issueVal": "76",
          "issueTime": "03:00",
          "clearDate": "2020-10-28",
          "issueDate": "2020-10-28",
          "moveName": "남부권",
          "clearTime": "13:00",
          "issueGbn": "주의보",
          "itemCode": "PM25"
        },
        {
          "clearVal": "66",
          "sn": "156",
          "districtName": "전북",
          "dataDate": "2020-04-04",
          "issueVal": "166",
          "issueTime": "15:00",
          "clearDate": "2020-04-04",
          "issueDate": "2020-04-04",
          "moveName": "정읍권역",
          "clearTime": "17:00",
          "issueGbn": "주의보",
          "itemCode": "PM10"
        },
        {
          "clearVal": "35",
          "sn": "123",
          "districtName": "서울",
          "dataDate": "2021-01-15",
          "issueVal": "85",
          "issueTime": "08:30",
          "clearDate": "2021-01-15",
          "issueDate": "2021-01-15",
          "moveName": "도심권",
          "clearTime": "16:00",
          "issueGbn": "주의보",
          "itemCode": "PM25"
        },
        {
          "clearVal": "45",
          "sn": "345",
          "districtName": "부산",
          "dataDate": "2020-11-05",
          "issueVal": "180",
          "issueTime": "11:00",
          "clearDate": "2020-11-06",
          "issueDate": "2020-11-05",
          "moveName": "동부권",
          "clearTime": "09:00",
          "issueGbn": "경보",
          "itemCode": "PM10"
        },
        {
          "clearVal": "22",
          "sn": "456",
          "districtName": "대구",
          "dataDate": "2021-03-10",
          "issueVal": "78",
          "issueTime": "10:00",
          "clearDate": "2021-03-10",
          "issueDate": "2021-03-10",
          "moveName": "달서구권",
          "clearTime": "15:30",
          "issueGbn": "주의보",
          "itemCode": "PM25"
        }
      ],
      "numOfRows": 100,
      "pageNo": 1,
      "totalCount": 5
    }
  }
};

export const AIR_QUALITY_ITEMS = AIR_QUALITY_DATA.response.body.items;
