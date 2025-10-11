import './Service.css';
import icon1 from '../../assets/Home-logo.png';
import icon2 from '../../assets/Caution.png';
import icon3 from '../../assets/People.png';
import icon4 from '../../assets/Lung.png';

function Service() {
  return (
      <div className='contents-size'>
        <div className="service-container">
          <h1 className='service-title'>서비스 소개</h1>
        </div>
        <div className="service-cardGrid">
{/* -------------------------------------------------------- */}
          <div className="card">
            <div className='card-icon-box'>
              <img src={icon1} className="card-icon" />
            </div>
            <div className='card-title-box'>
              <h2 className="card-title underline-medium-purple">메인 페이지</h2>
            </div>
            <p>미세먼지 농도</p>
            <p>상황별 행동지침</p>
          </div>
{/* -------------------------------------------------------- */}
          <div className="card">
            <div className="card-icon-box">
              <img src={icon2} className="card-icon" />
            </div>
            <div className="card-title-box">
              <h2 className="card-title underline-medium-purple">경보 페이지</h2>
            </div>
            <p>지역별 미세먼지 정보</p>
            <p>( 주의 / 경고 / 위험)</p>
          </div>
{/* -------------------------------------------------------- */}
          <div className="card">
            <div className="card-icon-box">
              <img src={icon3} className="card-icon" />
            </div>
            <div className="card-title-box">
              <h2 className="card-title underline-medium-purple">행동요령 페이지</h2>
            </div>
            <p>색상별 위험수준</p>
            <p>[ 좋음 / 보통 / 나쁨 / 매우 나쁨]</p>
          </div>
{/* -------------------------------------------------------- */}
          <div className="card">
            <div className="card-icon-box">
              <img src={icon4} className="card-icon" />
            </div>
            <div className="card-title-box">
              <h2 className="card-title underline-medium-purple">만든이 소개</h2>
            </div>
            <p>만든 사람들 소개</p>
            <p>공기 프랜즈 소개</p>
          </div>
{/* -------------------------------------------------------- */}
        </div>
      </div>
  )
}

export default Service;