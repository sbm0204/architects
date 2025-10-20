import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { DUST_UNITS } from '../../utils/getDustLevel.js';
import './AlertStatusCards.css';

dayjs.locale('ko');
// ----------------------------------------------------------------------
// 1. AlertDetailItem: 개별 권역 특보 항목을 렌더링하는 작은 컴포넌트 (스크롤 될 내용)
// ----------------------------------------------------------------------
const AlertDetailItem = ({ alert }) => {
    const {
        issueVal, clearVal,
        issueDate, issueTime, 
        clearDate, clearTime, 
        itemCode, moveName, // moveName을 그룹 내부에서 표시
    } = alert;

    // 날짜는 상위 카드에서 이미 표시되므로, 시간만 추출
    const issueTimeOnly = dayjs(`${issueDate} ${issueTime}`, 'YYYY-MM-DD HH:mm').format('A h시');

    const hasClearInfo = clearVal !== undefined && clearVal !== null && clearVal !== '';
    const clearTimeOnly = hasClearInfo 
        ? dayjs(`${clearDate} ${clearTime}`, 'YYYY-MM-DD HH:mm').format('A h시')
        : null;
    
    // API에서 받은 단위 사용 (예: µg/m³ 또는 ppm)
    const unit = DUST_UNITS[itemCode] || ''; 

    return (
        <div className="alert-detail-item">
            {/* 권역 이름 */}
            <p className="alert-detail-moveName">({moveName})</p> 
            
            {/* 발령 정보: (발령: 농도[등급] 시간) 형태 */}
            <div className="alert-detail-info alert-issue"> 
                <p className="alert-detail-value">
                    <span className="icon-alert">🚨 발령</span>: 
                    <span className="value-text">{issueVal}{unit} </span> 
                <span className="alert-detail-time">{issueTimeOnly}</span> 
                </p>
            </div>
            
            {/* 해제 정보 (있는 경우만 표시) */}
            {hasClearInfo && (
                <div className="alert-detail-info alert-clear"> 
                    <p className="alert-detail-value">
                        <span className="icon-clear">✅ 해제</span>: 
                        <span className="value-text">{clearVal}{unit} </span>
                    <span className="alert-detail-time">{clearTimeOnly}</span>
                    </p>
                </div>
            )}
        </div>
    );
}


// ----------------------------------------------------------------------
// 2. AlertStatusCards: 그룹화된 특보 목록을 받아 렌더링하는 메인 컴포넌트
// ----------------------------------------------------------------------
/**
 * @param {{groupedAlert: { dataDate: string, districtName: string, alerts: Array<Object> }}} props 
 */
const AlertStatusCards = ({ groupedAlert }) => { 
    // groupedAlert는 { dataDate: '...', districtName: '...', alerts: [...] } 구조
    const { dataDate, districtName, alerts } = groupedAlert;

    const formattedDate = dayjs(dataDate, 'YYYY-MM-DD').format('YYYY.MM.DD');

    // 카드의 대표 정보: 가장 최신 또는 중요한 항목의 issueGbn 사용 (경보 > 주의보 우선)
    const representativeAlert = alerts[0]; 
    const representativeIssueGbn = representativeAlert.issueGbn;

    const isWarning = representativeIssueGbn === "주의보";
    const isDanger = representativeIssueGbn === "경보";

    const badgeIssueGbnClass = isWarning
        ? 'badge-warning' 
        : isDanger
        ? 'badge-danger'
        : 'badge-default';

    return (
        <div className="alert-status-card">
            {/* 1. 카드 헤더: 지역 이름, 날짜, 대표 특보 뱃지 */}
            <div className="alert-status-card-header">
                {/* 뱃지 (경보/주의보) */}
                <div className={`alert-status-card-issueGbn ${badgeIssueGbnClass}`}>{representativeIssueGbn}</div>
            </div>

            <div className="alert-status-card-title-area">
                <h2 className="alert-status-card-districtName">{districtName}</h2>
                <p className="alert-status-card-date">{formattedDate}</p>
            </div>

            {/* 2. 카드 내용: 스크롤 영역 (핵심) */}
            <div className="alert-status-card-scroll-contents"> 
                {/* alerts 배열을 순회하며 개별 특보 아이템 렌더링 */}
                {alerts.map((alertItem, index) => (
                    // sn(일련번호)는 고유 키로 적합하지만, 데이터에 없는 경우 index 사용
                    <AlertDetailItem key={alertItem.sn || index} alert={alertItem} /> 
                ))}
            </div>
        </div>
    );
};

export default AlertStatusCards;