import { useEffect, useState } from 'react';
import './TopButton.css'

function TopButton() {
  const [bottom, setBottom] = useState(20);

  // TopButton과 Footer와 만났을 때 올리는 처리
  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector(".footer");
      if (!footer) return;

      const footerRect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const space = 10; // 여백

      if (footerRect.top < windowHeight) {
        // Footer가 보일 때
        const overlap = windowHeight - footerRect.top;
        setBottom(overlap + space);
      } else {
        // Footer가 보이지 않을 때
        setBottom(space);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <a href='#'>
      <div className="top-btn" style={{ bottom: `${bottom}px` }}></div>
    </a>
  );
}

export default TopButton;