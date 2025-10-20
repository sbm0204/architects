import "../service/Service.css";
import teamImageWeb from "/src/assets/teamimageweb.png";
import misemeonjiImageWeb from "/src/assets/misemeonjiimageweb.png";
const Service = () => {
  return (
    <div className="container">
      <h1 className="service-title">서비스 소개</h1>
      <div className="service-block">
        <div className="image-box">
          <img src={teamImageWeb} alt="팀 이미지" />
        </div>
        <div className="desktop-text-box">
          <h2>깨끗한 세상을 향한 우리의 발걸음</h2>
          <div className="underline"></div>
          <p>우리는 기술과 협력을 통해 더 나은 환경을 만들고자 합니다.</p>
          <p>작은 아이디어 하나에서 시작된 이 프로젝트는 모두가 안심하고</p>
          <p>숨 쉴 수 있는 세상을 위한 첫걸음 입니다.</p>
        </div>
        <div className="mobile-text-box">
          <h2>깨끗한 세상을 향한<br></br>우리의 발걸음</h2>
          <div className="underline"></div>
          <p>우리는 기술과 협력을 통해</p>
          <p>더 나은 환경을 만들고자 합니다.</p>
          <p>작은 아이디어 하나에서 시작된</p>
          <p>이 프로젝트는 모두가 안심하고</p>
          <p>숨 쉴 수 있는 세상을 위한 첫걸음 입니다.</p>
        </div>
      </div>
      <div className="service-block reverse">
         <div className="image-box">
          <img src={misemeonjiImageWeb} alt="마스크 이미지" />
        </div>
        <div className="desktop-text-box">
          <h2>정확한 정보로 지키는 우리의 하루</h2>
          <div className="underline"></div>
          <p>본 사이트는 실시간 미세먼지 농도와 대기질 정보를 제공합니다.</p>
          <p>데이터 기반의 신뢰할 수 있는 정보를 통해 사용자는</p>
          <p>자신의 건강을 지키고 환경문제에 대한 인식을 높일수 있습니다.</p>
        </div>
        <div className="mobile-text-box">
          <h2>정확한 정보로 지키는<br></br>우리의 하루</h2>
          <div className="underline"></div>
          <p>본 사이트는 실시간 미세먼지 농도와 </p>
          <p>대기질 정보를 제공합니다.</p>
          <p>데이터 기반의 신뢰할 수 있는 정보를 통해</p>
          <p>사용자는 자신의 건강을 지키고</p>
          <p>환경문제에 대한 인식을 높일수 있습니다.</p>
        </div>
      </div>
    </div>
  );
};
export default Service;