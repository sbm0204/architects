import './AlertDetailItem.css';
import dayjs from 'dayjs';
import { DUST_UNITS } from '../../utils/getDustLevel.js';

dayjs.locale('ko');

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

export default AlertDetailItem;