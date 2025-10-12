import dayjs from 'dayjs';
import { getDustLevel } from '../../utils/getDustLevel.js';

const AlertStatusCards = ({ item }) => { 
    // 💡 참고: issueGbn은 "주의보" 또는 "경보" 텍스트를 담고 있습니다.
    const {
        issueGbn,    // 💡 특보 종류 판단 기준 (예: "주의보", "경보")
        // alarmGbn, // (사용하지 않음)
        // issueGbn 필드가 이미 특보 종류를 나타내므로, 이 필드는 발령/해제 구분용이 아닐 가능성이 높습니다.
        districtName, // (지역명으로 사용자가 사용한 필드)
        issueVal, clearVal,
        issueDate, issueTime, 
        clearDate, clearTime, 
        itemCode, 
    } = item;

    // 💡 1. 특보 종류 판단 및 조건부 스타일링 (사용자 로직 확정)
    const isWarning = issueGbn === '주의보';
    const isDanger = issueGbn === '경보';

    const badgeIssueGbnClass = isWarning
        ? 'badge-warning' // 노란색 (주의보)
        : isDanger
        ? 'badge-danger'  // 빨간색 (경보)
        : 'badge-default';

    // 2. 수치 등급 변환 함수 사용 (getDustLevel 함수는 텍스트를 반환한다고 가정)
    const issueLevelInfo = getDustLevel(issueVal, itemCode);
    const clearLevelInfo = getDustLevel(clearVal, itemCode);

    // 3. 날짜/시간 포맷팅
    // API 데이터 형식(YYYYMMDD HH:mm)에 맞게 파싱 포맷을 조정하는 것이 안전합니다.
    const issueDateTime = dayjs(`${issueDate} ${issueTime}`, 'YYYYMMDD HH:mm').format('YYYY-MM-DD HH:mm');
    
    // 💡 4. 해제 정보 존재 여부 확인
    // 해제 농도(clearVal)가 유효하거나 해제 날짜(clearDate)가 있는 경우에만 해제 정보를 표시합니다.
    const hasClearInfo = clearVal !== undefined && clearVal !== null;
    const clearDateTimeFormatted = hasClearInfo 
        ? dayjs(`${clearDate} ${clearTime}`, 'YYYYMMDD HH:mm').format('YYYY-MM-DD HH:mm')
        : null;

    return (
        <div className='alert-status-cards-container'>
            <div className='alert-status-card'>
                {/* stationName 또는 districtName 중 유효한 것을 사용 */}
                <div className='alert-status-card-districtName'>{districtName}</div> 
                <div className='alert-status-card-contents'>
                    {/* 발령 정보 */}
                    <div className='alert-status-card-label'> 
                        <p>🚨발령: {issueVal}µg/m³ [{issueLevelInfo.label}]</p>
                        <p>{issueDateTime}</p>
                    </div>
                    
                    {/* 💡 해제 정보는 데이터가 있을 때만 표시 */}
                    {hasClearInfo && (
                        <div className='alert-status-card-label'> 
                            <p>✅해제: {clearVal}µg/m³ [{clearLevelInfo.label}]</p>
                            <p>{clearDateTimeFormatted}</p>
                        </div>
                    )}
                </div>
                {/* 💡 하단 버튼 텍스트는 issueGbn의 값(주의보/경보)을 그대로 사용 */}
                <div className={`alert-status-card-issueGbn ${badgeIssueGbnClass}`}>{issueGbn}</div>
            </div>
        </div>
    );
};

export default AlertStatusCards;