import { useEffect, useState } from 'react';
import './GuideLine.css';
import guideData from '../configs/guide-data.js';

function GuideLine() {
  const [dustJson, setDustJson] = useState(null);

  useEffect(() => {
    if(dustJson) {
      return
    }
    setDustJson(guideData);
  }, []);

  return (
    <div className='contents-size'>
      <h1 className="guide-header, content-title">미세먼지 등급 및 행동요령</h1>
      <div className='img'></div>

      <div className="guide-line-container">

        <div className="guide-line-box">
          <div className="guide-line-status-good content-title">{dustJson && dustJson[1].status}</div>
          <div className='guide-line-contents'>
            <div className="sensitive">
              <p>민감군</p>
              <p>
                {dustJson && dustJson[1].sensitive[0]}
              </p>
              <p>
                {dustJson && dustJson[1].sensitive[1]}
              </p>
            </div>
            <hr className='middle-line' />
            <div className="public">
              <p>일반인</p>
              <p>• 평소대로 활동</p>
              <p>• 정기적 건강 확인</p>
            </div>
          </div>
        </div>
        <div className="guide-line-box">
          <div className="guide-line-status-normal content-title">보통</div>
          <div className='guide-line-contents'>
            <div className="sensitive">
              <p>민감군</p>
              <p>• 실외활동시 특별히 행동에 제약을 받을 필요는 없지만 몸상태에 따라 유의하여 활동</p>
            </div>
            <hr className='middle-line' />
            <div className="public">
              <p>일반인</p>
              <p>• 평소대로 활동</p>
              <p>• 운전 및 대기오염 유발 행위 자제</p>
            </div>
          </div>
        </div>
        <div className="guide-line-box">
          <div className="guide-line-status-bad content-title">나쁨</div>
          <div className='guide-line-contents'>
            <div className="sensitive">
              <p>민감군</p>
              <p>• 장시간 무리한 실외활동 제한</p>
              <p>• 천식 환자는 흡입기 사용 빈도 ↑</p>
            </div>
            <hr className='middle-line' />
            <div className="public">
              <p>일반인</p>
              <p>• 장시간 또는 무리한 실외활동 제한</p>
              <p>• 눈·호흡기 불편 시 실외활동 피하기</p>
            </div>
          </div>
        </div>
        <div className="guide-line-box">
          <div className="guide-line-status-very-bad content-title">매우나쁨</div>
          <div className='guide-line-contents '>
            <div className="sensitive">
              <p>민감군</p>
              <p>• 평소대로 활동</p>
              <p>• 정기적 건강 확인</p>
            </div>
            <hr className='middle-line' />
            <div className="public">
              <p>일반인</p>
              <p>• 평소대로 활동</p>
              <p>• 정기적 건강 확인</p>
            </div>
          </div>
        </div>
        
      </div>
      <hr className='middle-line' />

      <div className="guide-line-container">
        <div className='guide-line-guide-start'>
          <div className='start-box'></div>
          <div className="start-content sub-title">고농도<br />미세먼지<br />7가지<br />행동 요령</div>
        </div>
        <div className="guide-line-box">
          <div className='guide-line-title'>
            <p className="guide-line-guide-head-1 content-title">1</p>
            <p className="guide-line-guide-title-1 content-sub-title">외출은 가급적 자제하기</p>
          </div>
          <p className="guide-line-guide-content">• 야외모임, 캠프, 스포츠 등 실외활동 최소화하기</p>
        </div>
        <div className="guide-line-box">
          <div className='guide-line-title'>
            <p className="guide-line-guide-head-2 content-title">2</p>
            <p className="guide-line-guide-title-2 content-sub-title">외출은 가급적 자제하기</p>
          </div>
          <p className="guide-line-guide-content">• 야외모임, 캠프, 스포츠 등 실외활동 최소화하기</p>
        </div>
        <div className="guide-line-box">
          <div className='guide-line-title'>
            <p className="guide-line-guide-head-3 content-title">3</p>
            <p className="guide-line-guide-title-3 content-sub-title">외출시 대기오염이<br />
            심한 곳은 피하고,<br />활동량 줄이기</p>
          </div>
          <p className="guide-line-guide-content">• 미세먼지 농도가 높은 도로변, 공사장 등에서 지체시간 줄이기<br />
          • 호흡량 증가로 미세먼지 흡입이 우려되는 격렬한 외부활동 줄이기</p>
        </div>
        <div className="guide-line-box">
          <div className='guide-line-title'>
            <p className="guide-line-guide-head-4 content-title">4</p>
            <p className="guide-line-guide-title-4 content-sub-title">외출시 대기오염이<br />
            심한 곳은 피하고,<br />활동량 줄이기</p>
          </div>
          <p className="guide-line-guide-content">• 미세먼지 농도가 높은 도로변, 공사장 등에서 지체시간 줄이기<br />
          • 호흡량 증가로 미세먼지 흡입이 우려되는 격렬한 외부활동 줄이기</p>
        </div>
        <div className="guide-line-box">
          <div className='guide-line-title'>
            <p className="guide-line-guide-head-5 content-title">5</p>
            <p className="guide-line-guide-title-5 content-sub-title">외출시 대기오염이<br />
            심한 곳은 피하고,<br />활동량 줄이기</p>
          </div>
          <p className="guide-line-guide-content">• 미세먼지 농도가 높은 도로변, 공사장 등에서 지체시간 줄이기<br />
          • 호흡량 증가로 미세먼지 흡입이 우려되는 격렬한 외부활동 줄이기</p>
        </div>
        <div className="guide-line-box">
          <div className='guide-line-title'>
            <p className="guide-line-guide-head-6 content-title">6</p>
            <p className="guide-line-guide-title-6 content-sub-title">외출시 대기오염이<br />
            심한 곳은 피하고,<br />활동량 줄이기</p>
          </div>
          <p className="guide-line-guide-content">• 미세먼지 농도가 높은 도로변, 공사장 등에서 지체시간 줄이기<br />
          • 호흡량 증가로 미세먼지 흡입이 우려되는 격렬한 외부활동 줄이기</p>
        </div>
        <div className="guide-line-box">
          <div className='guide-line-title'>
            <p className="guide-line-guide-head-7 content-title">7</p>
            <p className="guide-line-guide-title-7 content-sub-title">외출시 대기오염이<br />
            심한 곳은 피하고,<br />활동량 줄이기</p>
          </div>
          <p className="guide-line-guide-content">• 미세먼지 농도가 높은 도로변, 공사장 등에서 지체시간 줄이기<br />
          • 호흡량 증가로 미세먼지 흡입이 우려되는 격렬한 외부활동 줄이기</p>
        </div>
      </div>
    </div>
  )
}

export default GuideLine;