const DUST_LEVELS = {
  PM10: [
    { max: 30, label: '좋음' },
    { max: 80, label: '보통' },
    { max: 150, label: '나쁨' },
    { max: Infinity, label: '매우나쁨' },
  ],
  PM25: [
    { max: 15, label: '좋음' },
    { max: 35, label: '보통' },
    { max: 75, label: '나쁨' },
    { max: Infinity, label: '매우나쁨' },
  ],
  O3: [
    { max: 0.030, label: '좋음' },
    { max: 0.090, label: '보통' },
    { max: 0.150, label: '나쁨' },
    { max: Infinity, label: '매우나쁨' },
  ],
  NO2: [
    { max: 0.03, label: '좋음' },
    { max: 0.06, label: '보통' },
    { max: 0.20, label: '나쁨' }, 
    { max: Infinity, label: '매우나쁨' }, 
  ],
  CO: [
    { max: 2.0, label: '좋음' },
    { max: 9.0, label: '보통' },
    { max: 15.0, label: '나쁨' },
    { max: Infinity, label: '매우나쁨' },
  ],
  SO2: [
    { max: 0.02, label: '좋음' },
    { max: 0.05, label: '보통' },
    { max: 0.15, label: '나쁨' },
    { max: Infinity, label: '매우나쁨'},
  ],
};

export const DUST_UNITS = {
  PM10: 'µg/m³',
  PM25: 'µg/m³',
  O3: 'ppm',
  NO2: 'ppm',
  CO: 'ppm',
  SO2: 'ppm',
};

/**
 * 주어진 오염물질 값과 코드에 따른 대기 상태 레벨 정보를 반환합니다.
 * @param {number} value - 측정된 수치.
 * @param {string} itemCode - 오염물질 종류 ('PM10', 'PM25', 'O3', 'NO2', 'CO', 'SO2').
 * @returns {{max: number|Infinity, label: string}} - 레벨 정보 객체.
 */
export function getDustLevel(value, itemCode) {
  const levels = DUST_LEVELS[itemCode];
  if (!levels) return { label: '정보없음' }; 

  // value가 level.max보다 작거나 같은 첫 번째 레벨을 찾습니다.
  const found = levels.find(level => value <= level.max);

  return found || { label: '정보없음' }; 
}
