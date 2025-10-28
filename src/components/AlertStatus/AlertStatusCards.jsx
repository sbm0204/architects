import './AlertStatusCards.css';
import AlertDetailItem from '../AlertStatus/AlertDetailItem.jsx'

/**
 * @param {{groupedAlert: { dataDate: string, districtName: string, alerts: Array<Object> }}} props 
 */
const AlertStatusCards = ({ groupedAlert }) => { 
  const { districtName, alerts } = groupedAlert;

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
      
{/* 1. 카드 헤더 및 제목 영역 - 스크롤 외부 -------------------------------------------------------------------- */}
      <div className="alert-status-card-header">
        <div className={`alert-status-card-issueGbn ${badgeIssueGbnClass}`}>
        {representativeIssueGbn}
        </div>
      </div>
      <div className="alert-status-card-title-area">
        <h2 className="alert-status-card-districtName">{districtName}</h2>
      </div>

{/* 1-2. 스크롤 영역 -------------------------------------------------------------------- */}
      <div className="alert-status-card-scroll-contents"> 
        {alerts.map((alertItem, index) => (
          <AlertDetailItem key={alertItem.sn || index} alert={alertItem} /> 
        ))}
      </div>
    </div>
  );
};

export default AlertStatusCards;