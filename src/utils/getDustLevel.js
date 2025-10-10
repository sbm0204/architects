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
};

export function getDustLevel(value, itemCode) {
  const levels = DUST_LEVELS[itemCode];
  if (!levels) return '정보없음';

  return levels.find(level => value <= level.max)?.label || '정보없음';
}