import './Header.css';
import logonew from '../../assets/logonew.png'; //로고 임포트
import bgImage from '../../assets/bgimg-4.jpg'; //배경 이미지 임포트
import homeIcon from'../../assets/iconhome.png'; //홈 아이콘 임포트


function Header() {

 return (
    <>
      <div className='header-box'>
        <div className='header-box-contents'>          
          <div className='header-box-contents-bgimg' style={{backgroundImage: `url(${bgImage})`}}></div>
          <nav className='nav'>
            {/* 좌측 메뉴 */}
            <ul className='nav-left'>
              <li><img src={homeIcon} alt="홈아이콘" /></li>
              <li>미세먼지 경보</li>
            </ul>

            {/*로고 가운데*/}
            <div className='nav-logo'>
              <img src={logonew} alt="로고" />
            </div>

            {/* 우측 메뉴 */}
            <ul className='nav-right'>
              <li>행동요령</li>
              <li>서비스 소개</li>
            </ul>         
          </nav>
        </div>
      </div>
    </>
  );
}

export default Header;