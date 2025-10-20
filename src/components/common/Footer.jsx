import './Footer.css';
import logonew from '../../assets/logonew.png'; //로고 임포트
import { getSeasonBackground } from '../../utils/getSeasonBackground'; //계절 js 임포트

function Footer() {
 const seasonalBg = getSeasonBackground(); 

 return (
    <>
      <div className='footer'>
          <div className='footer-contents'>
            <div className='footer-contents-box' style={{backgroundImage: `url(${seasonalBg})`}}>
              <img src={logonew} alt="푸터 로고" />
              <p>(41932) 대구광역시 중구 중앙대로 394 제일빌딩 5층<br />대표번호 053) 572 - 1005 <br />&copy; 2025. Architects Team. All rights reserved.</p>
            </div>
          </div>
      </div>
    </>
  );
}

export default Footer;