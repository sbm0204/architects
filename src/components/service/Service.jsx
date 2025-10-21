import "../service/Service.css";
import teamImageWeb from "/src/assets/teamimageweb.png";
import misemeonjiImageWeb from "/src/assets/misemeonjiimageweb.png";
const Service = () => {
  return (
    <div className="container">
      <div className="service-container">
        <h2 className="service-title main-head-title">서비스 소개</h2>

        {/* 이하 데스크탑버전 */}
        <div className="service-item view-desktop">
          <div className="service-card">
            <div className="image-box">
              <img src={teamImageWeb} alt="팀 이미지" />
            </div>
            <div className="content-box">
              <h3 className="card-title">깨끗한 세상을 향한 우리의 발걸음</h3>
              <div className="underline"></div>
              <p>우리는 기술과 협력을 통해 <span>더 나은 환경을 만들고자 합니다.</span></p>
              <p>작은 아이디어 하나에서 시작된 <span>이 프로젝트는 모두가 안심하고</span></p>
              <p>숨 쉴 수 있는 세상을 위한 첫걸음 입니다.</p>
            </div>
          </div>

          <div className="service-card card-reverse">
            <div className="image-box">
              <img src={misemeonjiImageWeb} alt="마스크 이미지" />
            </div>
            <div className="content-box">
              <h3 className="card-title">정확한 정보로 지키는 우리의 하루</h3>
              <div className="underline"></div>
              <p>본 사이트는 실시간 미세먼지 농도와 <span>대기질 정보를 제공합니다.</span></p>
              <p>데이터 기반의 신뢰할 수 있는 정보를 통해 <span>사용자는 자신의</span></p>
              <p>건강을 지키고 환경문제에 대한 인식을 높일수 있습니다.</p>
            </div>
          </div>
        </div>

        {/* 이하 모바일버전 */}
        <div className="service-item view-mobile">
          <div className="service-card">
            <h3 className="card-title">깨끗한 세상을 향한 우리의 발걸음</h3>
            <div className="image-box">
              <img src={teamImageWeb} alt="팀 이미지" />
            </div>
            <div className="underline"></div>
            <p>우리는 기술과 협력을 통해</p>
            <p>더 나은 환경을 만들고자 합니다.</p>
            <p>작은 아이디어 하나에서 시작된</p>
            <p>이 프로젝트는 모두가 안심하고</p>
            <p>숨 쉴 수 있는 세상을 위한 첫걸음 입니다.</p>
          </div>

          <div className="service-card">
            <h3 className="card-title">정확한 정보로 지키는 우리의 하루</h3>
            <div className="image-box">
              <img src={misemeonjiImageWeb} alt="마스크 이미지" />
            </div>
            <div className="underline"></div>
            <p>본 사이트는 실시간 미세먼지 농도와 </p>
            <p>대기질 정보를 제공합니다.</p>
            <p>데이터 기반의 신뢰할 수 있는 정보를 통해</p>
            <p>사용자는 자신의 건강을 지키고</p>
            <p>환경문제에 대한 인식을 높일수 있습니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Service;





























