import './Header.css';
import logonew from '../../assets/logonew.png'; //로고 임포트
import bgImage from '../../assets/background-photo-gradation.png'; //배경 이미지 임포트



function Header() {

 return (
    <>
      {/* PC 헤더 */}
      <div className='header-pc'> 
        <div className='header-box'>
          <div className='header-background' style={{backgroundImage: `url(${bgImage})`}}>
            <div className='header-contents'>
              <div className='header-logo'>
                <img src={logonew} alt="헤더 로고" />
              </div>
              <div className='header-nav'>
                <div className='header-nav-contents'>미세먼지 경보</div>
                <div class="nav-line">|</div>
                <div className='header-nav-contents'>행동요령</div>
                <div class="nav-line">|</div>
                <div className='header-nav-contents'>서비스 소개</div>
              </div>
            </div>  
          </div>
        </div>
      </div> 

      {/* Mobile 헤더 */}
      <div className='header-mobile'>
        <div className='header-mobile-box'>
          <div className='header-mobile-background' style={{backgroundImage: `url(${bgImage})`}}>
            <div className='header-mobile-contents'>
              <img src={logonew} alt="모바일 헤더 로고" />
              <div className='header-mobile-hamburger'>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div> 
      </div>
    </> 
  );
}


export default Header;