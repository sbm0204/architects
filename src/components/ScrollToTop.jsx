import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 경로(pathname)가 변경될 때마다 이 코드가 실행됩니다.
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // 즉시 스크롤
    });
  }, [pathname]); // pathname이 의존성 배열에 있으므로 경로가 바뀔 때마다 실행됩니다.

  return null; // 이 컴포넌트는 아무것도 렌더링하지 않습니다.
};

export default ScrollToTop;