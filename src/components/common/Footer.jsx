import './Footer.css';
import logonew from '../../assets/logonew.png'; //로고 임포트
import bgImage from '../../assets/bgimg-4.jpg'; //배경 이미지 임포트
// import homeIcon from'../../assets/iconhome.png'; //홈 아이콘 임포트


function Footer() {

 return (
    <>
      <div className='footer-box'>
        <div className='footer-box-contents'>          
          <div className='footer-box-contents-bgimg' style={{backgroundImage: `url(${bgImage})`}}></div>
          <div className='footer-box-contents-box'>
            <img src={logonew} alt="푸터로고" />
            <p>(41932) 대구광역시 중구 중앙대로 394 제일빌딩 5층<br />대표번호 053) 572 - 1005 <br />&copy; 2025. Architects Team. All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;