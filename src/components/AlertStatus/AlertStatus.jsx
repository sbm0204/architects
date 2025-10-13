import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { alertStatusIndex } from '../../store/thunks/alertStatusThunk.js'; 
import { loadMoreAlerts } from '../../store/slices/alertStatusSlice.js'; 
import AlertStatusCards from './AlertStatusCards.jsx';
import './AlertStatus.css';

const AlertStatus = () => {
    const dispatch = useDispatch(); 
    
    const { 
        list, 
        currentView: displayedAlerts, 
        loading: reduxLoading, 
        noMoreApiData, 
        noMoreViewData 
    } = useSelector(state => state.alertStatus); 

    const isFinishedLoadingAllData = !reduxLoading && noMoreApiData && noMoreViewData;

    useEffect(() => {
        if (!reduxLoading && list.length === 0 && !noMoreApiData) {
            dispatch(alertStatusIndex()); 
        }
    }, [list.length, dispatch, reduxLoading, noMoreApiData]);

    const handleLoadMore = () => {
        if (!noMoreViewData) {
            dispatch(loadMoreAlerts()); 
        } 
        else if (!noMoreApiData && !reduxLoading) {
            dispatch(alertStatusIndex()); 
        }
    };

    const hasMoreDataToShow = !noMoreViewData || !noMoreApiData; 
    const isListEmpty = !reduxLoading && displayedAlerts.length === 0 && noMoreApiData;

    return (
        <div className="alerts-container">
            {reduxLoading && (
                <div className="loading-state-container">
                    <div className="loading-spinner"></div>
                    <p className="loading-text">데이터 로딩 중...</p>
                </div>
            )}

            {!reduxLoading && (
                <>
                    {isListEmpty && (
                        <div className="empty-message-box">
                            <p className="empty-message-text">
                                최근 한 달 이내 미세먼지 주의보/경보 발령 내역이 없습니다.
                            </p>
                        </div>
                    )}

                    {!isListEmpty && <h1 className='title'>미세먼지 경보 현황</h1>}
                    
                    <div className="cards-wrapper">
                        {displayedAlerts.map((alert, index) => (
                            <AlertStatusCards key={index} item={alert} /> 
                        ))}
                    </div>

                    <div className="pagination-area">
                        {hasMoreDataToShow ? (
                            <button 
                                onClick={handleLoadMore} 
                                className="load-more-button"
                                disabled={reduxLoading}
                            >
                                {reduxLoading ? '데이터 로딩 중...' : '더 보기'}
                            </button>
                        ) : (
                            isFinishedLoadingAllData  && displayedAlerts.length > 0 &&
                               <p className="end-message">✅ 최근 미세먼지 발령 내역을 모두 불러왔습니다.</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default AlertStatus;