import { precacheAndRoute } from 'workbox-precaching';

// Vite가 빌드 시, 여기세 정적 파일 경로를 삽입함. 
precacheAndRoute (self.__WB_MANIFEST);

// 이하 이벤트 처리
self.addEventListener('install', (e) => {
  console.log(`[서비스 워커] 설치 완료`, e);
});
self.addEventListener('activate', (e) => {
  console.log(`[서비스 워커] 활성화 중`, e);
});
self.addEventListener('fetch', (e) => {
  console.log(`[서비스 워커] 리소스 패치`, e);
});