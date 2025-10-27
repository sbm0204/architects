import './GuideLine.css';
import guideContents from '../../configs/guide-data.js';

function GuideLine() {

  return (
    <div className='container'>
      <h1 className="guide-header sub-title main-head-title">행동요령</h1>
      <p className='source'>출처 : 국민재난안전포털 제공</p>

      <div>
        <div></div>
        <p className='guide-line-small-header'>단계별 행동, 바로 확인해요</p>
      </div>
      <div className="guide-line-container">

        <div className="guide-line-box">
          <div className='guide-line-image-position'>
            <div className="guide-line-status-good guide-line-image-size"></div>
          </div>
          <div className='guide-line-contents'>
            <div className="sensitive">
              <p className='contents-bold'>민감군</p>
              <div className='guide-contents-box'>
                <p className={`guide-content ${guideContents?.good?.sensitive[0] ? 'pseudo' : ''}`}>
                  {guideContents && guideContents.good.sensitive[0]}
                </p>
                <p className={`guide-content ${guideContents?.good?.sensitive[1] ? 'pseudo' : ''}`}>
                  {guideContents && guideContents.good.sensitive[1]}
                </p>
              </div>
            </div>
            <hr className='middle-line' />
            <div className="public">
              <p className='contents-bold'>일반인</p>
              <div className="guide-contents-box">
                <p className={`guide-content ${guideContents?.good?.public[0] ? 'pseudo' : ''}`}>{guideContents && guideContents.good.public[0]}</p>
                <p className={`guide-content ${guideContents?.good?.public[1] ? 'pseudo' : ''}`}>{guideContents && guideContents.good.public[1]}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="guide-line-box">
          <div className='guide-line-image-position'>
            <div className="guide-line-status-moderate guide-line-image-size"></div>
          </div>
          <div className='guide-line-contents'>
            <div className="sensitive">
              <p className='contents-bold'>민감군</p>
              <div className='guide-contents-box'>
                <p className={`guide-content ${guideContents?.moderate?.sensitive[0] ? 'pseudo' : ''}`}>
                  {guideContents && guideContents.moderate.sensitive[0]}
                </p>
                <p className={`guide-content ${guideContents?.moderate?.sensitive[1] ? 'pseudo' : ''}`}>
                  {guideContents && guideContents.moderate.sensitive[1]}
                </p>
              </div>
            </div>
            <hr className='middle-line' />
            <div className="public">
              <p className='contents-bold'>일반인</p>
              <div className="guide-contents-box">
                <p className={`guide-content ${guideContents?.moderate?.public[0] ? 'pseudo' : ''}`}>{guideContents && guideContents.moderate.public[0]}</p>
                <p className={`guide-content ${guideContents?.moderate?.public[1] ? 'pseudo' : ''}`}>{guideContents && guideContents.moderate.public[1]}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="guide-line-box">
          <div className='guide-line-image-position'>
            <div className="guide-line-status-bad guide-line-image-size"></div>
          </div>
          <div className='guide-line-contents'>
            <div className="sensitive">
              <p className='contents-bold'>민감군</p>
              <div className='guide-contents-box'>
                <p className={`guide-content ${guideContents?.bad?.sensitive[0] ? 'pseudo' : ''}`}>
                  {guideContents && guideContents.bad.sensitive[0]}
                </p>
                <p className={`guide-content ${guideContents?.bad?.sensitive[1] ? 'pseudo' : ''}`}>
                  {guideContents && guideContents.bad.sensitive[1]}
                </p>
              </div>
            </div>
            <hr className='middle-line' />
            <div className="public">
              <p className='contents-bold'>일반인</p>
              <div className='guide-contents-box'>
                <p className={`guide-content ${guideContents?.bad?.public[0] ? 'pseudo' : ''}`}>{guideContents && guideContents.bad.public[0]}</p>
                <p className={`guide-content ${guideContents?.bad?.public[1] ? 'pseudo' : ''}`}>{guideContents && guideContents.bad.public[1]}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="guide-line-box">
          <div className='guide-line-image-position'>
            <div className="guide-line-status-very-bad guide-line-image-size"></div>
          </div>
          <div className='guide-line-contents'>
            <div className="sensitive">
              <p className='contents-bold'>민감군</p>
              <div className="guide-contents-box">
                <p className={`guide-content ${guideContents?.veryBad?.sensitive[0] ? 'pseudo' : ''}`}>
                  {guideContents && guideContents.veryBad.sensitive[0]}
                </p>
                <p className={`guide-content ${guideContents?.veryBad?.sensitive[1] ? 'pseudo' : ''}`}>
                  {guideContents && guideContents.veryBad.sensitive[1]}
                </p>
              </div>
            </div>
            <hr className='middle-line' />
              <div className="public">
              <p className='contents-bold'>일반인</p>
              <div className='guide-contents-box'>
                <p className={`guide-content ${guideContents?.veryBad?.public[0] ? 'pseudo' : ''}`}>{guideContents && guideContents.veryBad.public[0]}</p>
                <p className={`guide-content ${guideContents?.veryBad?.public[1] ? 'pseudo' : ''}`}>{guideContents && guideContents.veryBad.public[1]}</p>
              </div>

              </div>
            </div>
        </div>
      </div>

      <hr className='middle-line' />

      <div className="guide-line-container-img">
        <div className='guide-line-guide-start'>
          <div className='start-box'></div>
          <div className="start-content sub-title">고농도<br />미세먼지<br />7가지<br />행동 요령</div>
        </div>
        <div className="guide-img1 guide-img-size"></div>
        <div className="guide-img2 guide-img-size"></div>
        <div className="guide-img3 guide-img-size"></div>
        <div className="guide-img4 guide-img-size"></div>
        <div className="guide-img5 guide-img-size"></div>
        <div className="guide-img6 guide-img-size"></div>
        <div className="guide-img7 guide-img-size"></div>

      </div>
    </div>
  )
}

export default GuideLine;