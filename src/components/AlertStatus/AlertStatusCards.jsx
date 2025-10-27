import './AlertStatusCards.css';
import dayjs from 'dayjs';
import AlertDetailItem from './AlertDetailItem.jsx'

// 2. AlertStatusCards: 그룹화된 특보 목록을 받아 렌더링하는 메인 컴포넌트
/**
 * @param {{groupedAlert: { dataDate: string, districtName: string, alerts: Array<Object> }}} props 
 */
const AlertStatusCards = ({ groupedAlert }) => { 
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
      
{/* 2-1. 카드 헤더 및 제목 영역 - 스크롤 외부 -------------------------------------------------------------------- */}
      <div className="alert-status-card-header">
        <div className={`alert-status-card-issueGbn ${badgeIssueGbnClass}`}>
        {representativeIssueGbn}
        </div>
      </div>
      <div className="alert-status-card-title-area">
        <h2 className="alert-status-card-districtName">{districtName}</h2>
        <p className="alert-status-card-date">{formattedDate}</p>
      </div>

{/* 2-2. 스크롤 영역 -------------------------------------------------------------------- */}
      <div className="alert-status-card-scroll-contents"> 
        {alerts.map((alertItem, index) => (
          <AlertDetailItem key={alertItem.sn || index} alert={alertItem} /> 
        ))}
      </div>
    </div>
  );
};

export default AlertStatusCards;