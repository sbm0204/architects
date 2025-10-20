import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useMemo } from 'react'; // useMemo를 사용하여 그룹화 로직 최적화
import { alertStatusIndex } from '../../store/thunks/alertStatusThunk.js'; 
import { loadMoreAlerts } from '../../store/slices/alertStatusSlice.js'; 
import AlertStatusCards from './AlertStatusCards.jsx';
import './AlertStatus.css';
import { getTodayDate } from '../../utils/dateFilter.js';
import { groupAlertsByDateAndDistrict } from '../../utils/dataGroupingLogic.js'; // ⬅️ 그룹화 함수 import 가정

const AlertStatus = () => {
    const dispatch = useDispatch(); 
    
    const { 
        list, 
        currentView: displayedAlerts, // 원본 API 응답의 개별 항목 리스트
        loading: reduxLoading, 
        noMoreApiData, 
        noMoreViewData, 
        error
    } = useSelector(state => state.alertStatus); 

    // 💡 핵심 추가 로직: displayedAlerts(개별 항목)를 그룹화 (dataDate, districtName 기준)
    const groupedAlerts = useMemo(() => {
        // Redux 상태가 변경될 때만 그룹화 로직을 다시 실행하여 성능 최적화
        return groupAlertsByDateAndDistrict(displayedAlerts);
    }, [displayedAlerts]);

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

    // 렌더링에 사용되는 데이터는 그룹화된 데이터 (groupedAlerts)
    const isListEmpty = !reduxLoading && groupedAlerts.length === 0 && noMoreApiData; 
    const hasMoreDataToShow = !noMoreViewData || !noMoreApiData; 

    const today = getTodayDate();

    return (
        <div className="container">
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
                    {!isListEmpty && 
                    <div className="title-area">
                        <h1 className="title main-head-title">미세먼지 경보</h1>
                        <div className="title-detail">({today} 기준 최근 1개월 특보 현황)</div>
                    </div>}
                    
                    <div className="cards-wrapper">
                        {/* 💡 변경: 그룹화된 데이터를 순회하며, groupedAlert props로 전달 */}
                        {groupedAlerts.map((group, index) => (
                            <AlertStatusCards 
                                key={`${group.dataDate}-${group.districtName}`} 
                                groupedAlert={group} // ⬅️ 변경: group 객체를 전달
                            /> 
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
                            isFinishedLoadingAllData  && groupedAlerts.length > 0 && // ⬅️ length 체크도 groupedAlerts로 변경
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