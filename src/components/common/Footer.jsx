import './Footer.css';
import logonew from '../../assets/logonew.png'; //로고 임포트
import bgImage from '../../assets/background-photo-gradation.png'; //배경 이미지 임포트



function Footer() {

 return (
    <>
      <div className='footer'>
          <div className='footer-contents'>
            <div className='footer-contents-box' style={{backgroundImage: `url(${bgImage})`}}>
              <img src={logonew} alt="푸터 로고" />
              <p>(41932) 대구광역시 중구 중앙대로 394 제일빌딩 5층<br />대표번호 053) 572 - 1005 <br />&copy; 2025. Architects Team. All rights reserved.</p>
            </div>
          </div>
      </div>
    </>
  );
}

export default Footer;