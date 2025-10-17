import dayjs from 'dayjs';
import { getDustLevel } from '../../utils/getDustLevel.js';
import { DUST_UNITS } from '../../utils/getDustLevel.js';
import './AlertStatusCards.css';

const AlertStatusCards = ({ item }) => { 
    const {
        issueGbn,    
        districtName, 
        issueVal, clearVal,
        issueDate, issueTime, 
        clearDate, clearTime, 
        itemCode, 
    } = item;

    const isWarning = issueGbn === "주의보";
    const isDanger = issueGbn === "경보";

    const badgeIssueGbnClass = isWarning
        ? 'badge-warning' 
        : isDanger
        ? 'badge-danger'  
        : 'badge-default';

    const issueLevelInfo = getDustLevel(issueVal, itemCode);
    const clearLevelInfo = getDustLevel(clearVal, itemCode);

    const issueDateTime = dayjs(`${issueDate} ${issueTime}`, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm');

    const hasClearInfo = clearVal !== undefined && clearVal !== null;
    const clearDateTimeFormatted = hasClearInfo 
      ? dayjs(`${clearDate} ${clearTime}`, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm')
      : null;
    
    const unit = DUST_UNITS[itemCode] || '';

    return (
        <>
            <div className="alert-status-card">
                <div className="alert-status-card-districtName">{districtName}</div> 
                <div className="alert-status-card-contents">
                    <div className="alert-status-card-label"> 
                        <p>🚨 발령 : {issueVal}{unit} [{issueLevelInfo.label}]</p>
                        <p>{issueDateTime}</p>
                    </div>
                    
                    {hasClearInfo && (
                        <div className="alert-status-card-label"> 
                            <p>✅ 해제 : {clearVal}{unit} [{clearLevelInfo.label}]</p>
                            <p>{clearDateTimeFormatted}</p>
                        </div>
                    )}
                </div>
                <div className={`alert-status-card-issueGbn ${badgeIssueGbnClass}`}>{issueGbn}</div>
            </div>
        </>
    );
};

export default AlertStatusCards;