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
        itemCode, moveName,
    } = alert;

    const issueTimeOnly = dayjs(`${issueDate} ${issueTime}`, 'YYYY-MM-DD HH:mm').format('A h시');

    const hasClearInfo = clearVal !== undefined && clearVal !== null && clearVal !== '';
    const clearTimeOnly = hasClearInfo 
        ? dayjs(`${clearDate} ${clearTime}`, 'YYYY-MM-DD HH:mm').format('A h시')
        : null;
    
    const unit = DUST_UNITS[itemCode] || ''; 

    return (
        <div className="alert-detail-container">
            {/* 권역 이름 - moveName */}
            <p className="alert-detail-moveName">({moveName})</p> 
            <div className="alert-detail-info alert-issue"> 
                <p className="alert-detail-value">
                    <span>🚨 발령</span>: 
                    <span>{issueVal}{unit}</span> 
                <span className="alert-detail-time">{issueTimeOnly}</span> 
                </p>
            </div>

            {hasClearInfo && (
                <div className="alert-detail-info alert-clear"> 
                    <p className="alert-detail-value">
                        <span>✅ 해제</span>: 
                        <span>{clearVal}{unit}</span>
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

    // 카드의 뱃지(issueGbn): 가장 최신 또는 중요한 항목의 issueGbn 사용 (경보 > 주의보 우선)
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
                <div className={`alert-status-card-issueGbn ${badgeIssueGbnClass}`}>{representativeIssueGbn}</div>
            </div>

            <div className="alert-status-card-title-area">
                <h2 className="alert-status-card-districtName">{districtName}</h2>
                <p className="alert-status-card-date">{formattedDate}</p>
            </div>

            {/* 2. 카드 내용: 스크롤 영역 */}
            <div className="alert-status-card-scroll-contents"> 
                {alerts.map((alertItem, index) => (
                    // sn(일련번호)는 고유 키로 적합하지만, 데이터에 없는 경우 index 사용
                    <AlertDetailItem key={alertItem.sn || index} alert={alertItem} /> 
                ))}
            </div>
        </div>
    );
};

export default AlertStatusCards;