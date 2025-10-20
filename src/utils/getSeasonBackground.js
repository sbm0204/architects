// 현재 월을 기준으로 계절별 배경 이미지 결정
import bgSpring from '../assets/spring.png'; // 3~5월
import bgSummer from '../assets/summer.png'; // 6~8월
import bgAutumn from '../assets/autumn.png'; // 9~11월
import bgWinter from '../assets/winter.png'; // 12~2월

export function getSeasonBackground() {
  const now = new Date();
  const month = now.getMonth() + 1; // 실제 월  

  // const testMonth = 6; // 임시로 테스트 월 (주석처리 삭제 금지, 테스트시 필요)
  // const month = testMonth; // 임시로 테스트 월 선언 (주석처리 삭제 금지, 테스트시 필요)

  if (month >= 3 && month <= 5) return bgSpring; // 봄
  if (month >= 6 && month <= 8) return bgSummer; // 여름
  if (month >= 9 && month <= 11) return bgAutumn; // 가을
  return bgWinter; // 겨울 (12, 1, 2)
}