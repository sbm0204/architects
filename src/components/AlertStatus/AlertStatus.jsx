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
        noMoreViewData, 
        error
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
// 1. 로딩 중 UI-----------------------------------------------------------------------------------------
                <div className="loading-state-container">
                    <div className="loading-spinner"></div>
                    <p className="loading-text">데이터 로딩 중...</p>
                </div>
            )}

{/* 1-1. 로딩이 끝나고 오류가 생겼을 때 보여지는 UI----------------------------------------------------------- */}
            {!reduxLoading && error && (
              <div className="error-message-box">
                <h1 className="error-message-title">⚠️ 데이터 로드 실패</h1>
                <p className="error-message-text">오류 발생. 다시 시도해 주세요. </p>
                <p className="error-message-detail">오류 상태: {error}</p>
                <botton 
                    onClick={() => dispatch(alertStatusIndex())}
                    className="retry-btn">다시 시도</botton>
              </div>
            )}
            
{/* 1-2. 로딩이 끝나고 정상 데이터를 렌더링하는 코드 시작------------------------------------------------------- */}
            {!reduxLoading && (
                <>
{/* 2. 데이터 없음 UI-------------------------------------------------------------------------------------- */}
                    {isListEmpty && (
                        <div className="empty-message-box">
                            <p className="empty-message-text">
                                최근 한 달간 미세먼지 발령 내역이 없습니다.
                            </p>
                        </div>
                    )}

{/* 3. 정상 데이터 UI-------------------------------------------------------------------------------------- */}                    
                    {!isListEmpty && <h1 className="title">미세먼지 경보 현황</h1>}
                    <div className="cards-wrapper">
                        {displayedAlerts.map((alert, index) => (
                            <AlertStatusCards key={index} item={alert} /> 
                        ))}
                    </div>

{/* 4. 더 보기 / 끝 메세지 UI------------------------------------------------------------------------------- */}
                    <div className="pagination-area">
                        {hasMoreDataToShow ? (
                            <button 
                                onClick={handleLoadMore} 
                                className="load-more-btn"
                                disabled={reduxLoading}
                            >
                                {reduxLoading ? '데이터 로딩 중...' : '더 보기'}
                            </button>
                        ) : (
                            isFinishedLoadingAllData  && displayedAlerts.length > 0 &&
                               <p className="end-message">
                                ✅ 최근 미세먼지 발령 내역 불러오기 완료
                               </p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default AlertStatus;