import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logonew from '../../assets/logonew.png'; //로고 임포트
import logomini from '../../assets/logonewmini.png'; //미니 로고 임포트
import { getSeasonBackground } from '../../utils/getSeasonBackground.js'; //계절 js 임포트


function Header() {
 const [isMenuOpen, setIsMenuOpen] = useState(false);

 const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
 const closeMenu = () => setIsMenuOpen(false);

 const seasonalBg = getSeasonBackground();
 return (
    <>
      {/* PC 헤더 */}
      <div className='header-pc'> 
        <div className='header-box'>
          <div className='header-background' style={{backgroundImage: `url(${seasonalBg})`}}>
            <div className='header-contents'>
              {/* 로고 클릭 시 홈으로 이동 */}
              <div className='header-logo'>
                <Link to="/">
                  <img src={logonew} alt="헤더 로고" />
                </Link>  
              </div>

              {/* 메뉴 링크 */}
              <div className='header-nav'>
                <Link to="/alertStatus" className='header-nav-contents'>미세먼지 경보</Link>
                <div className="nav-line">|</div>
                <Link to="/guideLine" className='header-nav-contents'>행동요령</Link>
                <div className="nav-line">|</div>
                <Link to="/service" className='header-nav-contents'>서비스 소개</Link>
              </div>
            </div>  
          </div>
        </div>
      </div> 

      {/* Mobile 헤더 */}
      <div className='header-mobile'>
        <div className='header-mobile-box'>
          <div className='header-mobile-background' style={{backgroundImage: `url(${seasonalBg})`}}>
            <div className='header-mobile-contents'>
              {/* 홈 아이콘 클릭 시 홈으로 이동 */}
                <Link to="/">
                  <img className='header-mobile-logo' src={logonew} alt="모바일 헤더 로고" />
                </Link>
              <div className='header-mobile-hamburger' onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div> 
      </div>

      {/* 슬라이드 메뉴 */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className='mobile-menu-header'>
          <button className='close-btn' onClick={closeMenu}>x</button>
        </div>
        <div className='mobile-menu-items'>
          {/* 홈 아이콘 클릭 시 홈으로 이동 */}
           <div className='itemhome'>
            <Link to="/" onClick={closeMenu}>
              <img className='mini-homeicon' src={logomini} alt="로고 미니 아이콘" />
            </Link>
          </div>
          <div className='menu-first-line'></div>

          {/* 메뉴 링크 */}
          <Link to="/alertStatus" className='menu-item' onClick={closeMenu}>미세먼지 경보</Link>
          <div className='menu-line'></div>
          <Link to="/guideLine" className='menu-item' onClick={closeMenu}>행동요령</Link>
          <div className='menu-line'></div>
          <Link to="/service" className='menu-item' onClick={closeMenu}>서비스 소개</Link>
          <div className='menu-line'></div>
        </div>
      </div>

      {/* 메뉴 오픈 시 배경 어둡게 */}
      {isMenuOpen && <div className='menu-overlay' onClick={closeMenu}></div>}
    </> 
  );
}


export default Header;