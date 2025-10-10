import './AlertStatusCards.css';

function AlertStatusCards() {

  return (
    <>
      <div className='alert-status-cards-contents'>
        <h1 className='title'>미세먼지 경보 현황</h1>
        <div className='alert-status-cards-container'>
            <div className='alert-status-card'>
                <div className='alert-status-card-districtName'>서울</div>
                <div className='alert-status-card-contents'>
                    <div> 
                        <p>🚨발령: 100 µg/m³ [나쁨]</p>
                        <p>2025-09-26 12:00</p>
                    </div>
                    <div> 
                        <p>✅해제: 50 µg/m³ [보통]</p>
                        <p>2025-09-26 15:00</p>
                    </div>
                </div>
                <div className='alert-status-card-issueGbn'>⚠ 주의보</div>
            </div>  
            <div className='alert-status-card'>
                <div className='alert-status-card-districtName'>서울</div>
                <div className='alert-status-card-contents'>
                    <div> 
                        <p>🚨발령: 100 µg/m³ [나쁨]</p>
                        <p>2025-09-26 12:00</p>
                    </div>
                    <div> 
                        <p>✅해제: 50 µg/m³ [보통]</p>
                        <p>2025-09-26 15:00</p>
                    </div>
                </div>
                <div className='alert-status-card-issueGbn'>⚠ 주의보</div>
            </div>

            <div className='alert-status-card'>
                <div className='alert-status-card-districtName'>서울</div>
                <div className='alert-status-card-contents'>
                    <div> 
                        <p>🚨발령: 100 µg/m³ [나쁨]</p>
                        <p>2025-09-26 12:00</p>
                    </div>
                    <div>
                        <p>✅해제: 50 µg/m³ [보통]</p>
                        <p>2025-09-26 15:00</p>
                    </div>
                </div>
                <div className='alert-status-card-issueGbn'>⚠ 주의보</div>
            </div>
            <div className='alert-status-card'>
                <div className='alert-status-card-districtName'>서울</div>
                <div className='alert-status-card-contents'>
                    <div> 
                        <p>🚨발령: 100 µg/m³ [나쁨]</p>
                        <p>2025-09-26 12:00</p>
                    </div>
                    <div> 
                        <p>✅해제: 50 µg/m³ [보통]</p>
                        <p>2025-09-26 15:00</p>
                    </div>
                </div>
                <div className='alert-status-card-issueGbn'>⚠ 주의보</div>
            </div>
        </div>
        <button type='button' className='btnformoredata'>더 보기</button>
      </div>
    </>
  )
}

export default AlertStatusCards;