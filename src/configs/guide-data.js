export default {
  good:
  {
    status: "좋음",
    grade: "1",
    sensitive: ["평소대로 활동",
      "정기적 건강 확인"],
    public: ["평소대로 활동",
      "정기적 건강 확인"]
  },
  
  moderate:
  {
    status: "보통",
    grade: "2",
    sensitive: ["실회 활동 시에는 특별히 제한사항 없음","몸상태에 따라 유의하여 활동"],
    public: ["평소대로 활동", "운전 및 대기오염 유발 행위 자제"]
  },

  bad:
  {
    status: "나쁨",
    grade: "3",
    sensitive: ["장시간 무리한 실외활동 제한", "천식 환자는 흡입기 사용 빈도 ↑"],
    public: ["장시간 또는 무리한 실외활동 제한", "눈·호흡기 불편 시 실외활동 피하기"]
  },

  veryBad:
  {
    status: "매우나쁨",
    grade: "4",
    sensitive: ["가급적 실내에서 활동","실외 활동 시에는 의사와 상의"],
    public: ["장시간 또는 무리한 실외활동 제한", "감기 등의 증상있는 사람은 실외활동 피하기"]
  },

  noneData:
  {
    status: "정보없음",
    sensitive: ["지역을 선택해 주세요",""],
    public: ["지역을 선택해 주세요",""],
  }
}
