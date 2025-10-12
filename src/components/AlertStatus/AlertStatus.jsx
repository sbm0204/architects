import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, useMemo } from 'react'; // useMemo 추가
import dayjs from 'dayjs';
import { getRecentThreeDaysData } from '../../utils/dayjs.js'; 
import { alertStatusIndex } from '../../store/thunks/alertStatusThunk.js'; // Thunk import
import AlertStatusCards from './AlertStatusCards.jsx';
import './AlertStatus.css';

const INITIAL_LOAD_COUNT = 8;
const LOAD_MORE_COUNT = 4;

const AlertStatus = () => {
    const dispatch = useDispatch(); 
    
    // ⭐️ Redux Slice에서 필요한 상태들을 가져옵니다.
    const { 
        list, // 모든 데이터 (필터링 전)
        page, 
        loading: reduxLoading, // Redux의 로딩 상태
        noMoreData 
    } = useSelector(state => state.alertStatus); 
    
    // 표시 개수만 로컬 상태로 관리
    const [displayCount, setDisplayCount] = useState(INITIAL_LOAD_COUNT);


    // ⭐️ useMemo: list가 변경될 때만 필터링 및 정렬을 수행합니다. (무한 루프 방지)
    const filteredAlerts = useMemo(() => {
        if (list.length === 0) return [];
        
        const filtered = getRecentThreeDaysData(list); 
                    
        filtered.sort((a, b) => {
            const aTime = dayjs(`${a.issueDate} ${a.issueTime}`, 'YYYY-MM-DD HH:mm').valueOf();
            const bTime = dayjs(`${b.issueDate} ${b.issueTime}`, 'YYYY-MM-DD HH:mm').valueOf();
            return bTime - aTime;
        });
        
        // 데이터가 변경될 때마다 displayCount를 초기화하여 처음부터 보여줍니다. (선택적)
        // setDisplayCount(INITIAL_LOAD_COUNT); 
        
        return filtered;

    }, [list]); // list가 변경될 때만 이 로직이 재계산됩니다.


    // ⭐️ useEffect: 최초 데이터 로드 (Thunk 호출)와 상태 초기화에만 집중합니다.
    useEffect(() => {
        // 컴포넌트 마운트 시 최초 데이터 로드를 Redux에 요청
        if (page === 1 && list.length === 0 && !reduxLoading && !noMoreData) {
            dispatch(alertStatusIndex(1)); 
        }     

    }, [list, dispatch, page, reduxLoading, noMoreData]); // 의존성 배열 유지


    // ⭐️ '더 보기' 버튼 클릭 핸들러
    const handleLoadMore = () => {
        // 로컬 표시 개수 증가
        setDisplayCount(prev => prev + LOAD_MORE_COUNT);

        // 표시 개수가 필터링된 전체 개수보다 크거나 같을 때만 다음 페이지를 요청
        if (displayCount >= filteredAlerts.length && !reduxLoading && !noMoreData) {
            dispatch(alertStatusIndex(page)); 
        }
    };


    // ⭐️ 화면 표시를 위한 파생 상태
    const displayedAlerts = filteredAlerts.slice(0, displayCount);
    // filteredAlerts에 로컬로 표시할 데이터가 남아있거나, Redux에 더 불러올 페이지가 있다면 hasMore는 true
    const hasMore = displayCount < filteredAlerts.length || (!noMoreData && filteredAlerts.length === list.length); 
    
    // 로딩이 끝났고, 필터링된 데이터가 없으며, 더 이상 데이터가 없다는 플래그가 true일 때 빈 리스트 메시지를 표시
    const isListEmpty = !reduxLoading && filteredAlerts.length === 0 && noMoreData; 


    return (
        <div className="alerts-container">
            {/* 로딩 상태는 Redux Loading을 사용 */}
            {reduxLoading && (
                <div className="loading-state-container">
                    <div className="loading-spinner"></div>
                    <p className="loading-text">데이터 로딩 중...</p>
                </div>
            )}

            {/* 로딩이 아닐 때 콘텐츠 표시 */}
            {!reduxLoading && (
                <>
                    {isListEmpty && (
                        <div className="empty-message-box">
                            <p className="empty-message-text">
                                최근 3일 이내 미세먼지 주의보/경보 발령 내역이 없습니다.
                            </p>
                        </div>
                    )}

                    {!isListEmpty && <h1 className='title'>미세먼지 경보 현황</h1>}
                    
                    <div className="cards-wrapper">
                        {displayedAlerts.map((alert, index) => (
                            <AlertStatusCards key={index} data={alert} /> 
                        ))}
                    </div>

                    <div className="pagination-area">
                        {hasMore ? (
                            <button 
                                onClick={handleLoadMore} 
                                className="load-more-button"
                                disabled={reduxLoading}
                            >
                                {reduxLoading ? '데이터 로딩 중...' : '더 보기'}
                            </button>
                        ) : (
                            !isListEmpty && <p className="end-message">✅ 모든 미세먼지 발령 내역을 불러왔습니다.</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default AlertStatus;