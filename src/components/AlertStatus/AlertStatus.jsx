import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useMemo, useState } from 'react'; // 'useState' 추가
import { alertStatusIndex } from '../../store/thunks/alertStatusThunk.js'; 
import { setFilterMonth } from '../../store/slices/alertStatusSlice.js'; // setFilterMonth 액션 추가
import AlertStatusCards from './AlertStatusCards.jsx';
import './AlertStatus.css';
import { groupAlertsByDateAndDistrict } from '../../utils/dataGroupingLogic.js';

// 드롭다운 항목 정의
const MONTH_OPTIONS = [
    { value: 1, label: '1개월' },
    { value: 2, label: '2개월' },
    { value: 3, label: '3개월' },
];

const AlertStatus = () => {
    const dispatch = useDispatch(); 
    
    const { 
        list, 
        currentView: displayedAlerts,
        loading: reduxLoading, 
        noMoreApiData, 
        error,
        filterMonth,
    } = useSelector(state => state.alertStatus);

    // 드롭다운 UI 상태 관리
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // 💡 핵심 추가 로직: displayedAlerts(개별 항목)를 그룹화 (dataDate, districtName 기준)
    const groupedAlerts = useMemo(() => {
        // Redux 상태가 변경될 때만 그룹화 로직을 다시 실행하여 성능 최적화
        return groupAlertsByDateAndDistrict(displayedAlerts);
    }, [displayedAlerts]);

const isFinishedLoadingAllData = !reduxLoading && noMoreApiData; // 💡 noMoreViewData 제거

    // Redux 로드 로직: filterMonth가 변경되거나, 초기 로드시 재요청
    useEffect(() => {
        // filterMonth가 변경되면 Redux store의 list와 view를 초기화 후 API 재요청이 필요합니다.
        // 현재 alertStatusSlice.js에 filterMonth 변경 처리 로직이 없으므로,
        // filterMonth 상태가 변경될 때마다 alertStatusIndex()를 호출하도록 수정합니다.
        // AlertStatusSlice에서 list/filteredList/currentView를 초기화해야 합니다.
        if (!reduxLoading && list.length === 0 && !noMoreApiData) {
            // 이 로직은 초기 로드 시에만 사용되어야 합니다.
            dispatch(alertStatusIndex()); 
        }
        // filterMonth가 변경되면 무조건 API 재요청 및 상태 초기화를 위해 dispatch(alertStatusIndex())를 호출해야 합니다.
        // (alertStatusSlice.js에서 filterMonth가 변경될 때 list를 초기화하는 로직이 필요함)
    }, [list.length, dispatch, reduxLoading, noMoreApiData, filterMonth]); // filterMonth를 종속성 배열에 추가
    
    // 드롭다운 핸들러
    const handleMonthChange = (month) => {
        dispatch(setFilterMonth(month)); // Redux 상태 변경
        setIsDropdownOpen(false);
    };

    const isListEmpty = !reduxLoading && groupedAlerts.length === 0 && noMoreApiData; 
    const hasMoreDataToShow = !noMoreApiData; // API에서 더 불러올 데이터가 남았는지를 판단 (API가 페이지네이션을 사용한다면)
    const currentLabel = MONTH_OPTIONS.find(opt => opt.value === filterMonth)?.label || '1개월';

    return (
        <div className="container">
            {reduxLoading && (
                <div className="loading-state-container">
                    <div className="loading-spinner"></div>
                    <p className="loading-txt">데이터 로딩 중...</p>
                </div>
            )}

            {!reduxLoading && error && (
                <div className="error-msg-box">
                    <h1 className="error-msg-title">⚠️ 데이터 로드 실패</h1>
                    <p className="error-msg-txt">오류 발생 - 다시 시도해 주세요.</p>
                    <p className="error-msg-detail">오류 상태: {error}</p>
                    <button 
                        onClick={() => dispatch(alertStatusIndex())}
                        className="retry-btn">다시 시도</button>
                </div>
            )}
            
            {!reduxLoading && !error && (
                <>
                    {isListEmpty && (
                        <div className="empty-msg-box">
                            <p className="empty-msg-txt">
                                📍 최근 {filterMonth}개월간 발령 내역이 없습니다.
                            </p>
                        </div>
                    )}

                    {!isListEmpty && 
                    // 3. 정상 데이터 UI: 이미지에 맞게 제목 및 드롭다운 구조 변경
                    <div className="title-area">
                        <h1 className="title main-head-title">미세먼지 경보</h1>
                        
                        {/* 💡 드롭다운 UI 구현 */}
                        <div className="dropdown-container">
                            <p className="dropdown-label">최근 특보 현황</p>
                            <div 
                                className={`dropdown-select ${isDropdownOpen ? 'open' : ''}`}
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                                <span className="selected-value">{currentLabel}</span>
                                <span className="dropdown-arrow">▼</span>
                                
                                {isDropdownOpen && (
                                    <ul className="dropdown-menu">
                                        {MONTH_OPTIONS.map((option) => (
                                            <li 
                                                key={option.value} 
                                                className={`dropdown-item ${filterMonth === option.value ? 'selected' : ''}`}
                                                onClick={(e) => {
                                                    e.stopPropagation(); // 부모 클릭 이벤트 방지
                                                    handleMonthChange(option.value);
                                                }}
                                            >
                                                {option.label}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                        {/* 💡 이미지에서 날짜는 각 카드에 표시되므로, 여기서는 제거 */}
                        {/* <div className="title-detail">({today} 기준 최근 1개월 특보 현황)</div> */}
                    </div>}
                    
                    <div className="cards-wrapper">
                        {groupedAlerts.map(( group ) => (
                            // 💡 AlertStatusCards에 dataDate를 prop으로 전달하여 카드 상단에 표시하도록 합니다.
                            <AlertStatusCards 
                                key={`${group.dataDate}-${group.districtName}`} 
                                groupedAlert={group}
                                dataDate={group.dataDate} // 추가
                            /> 
                        ))}
                    </div>

                    {/* 더 보기 / 끝 메세지 UI는 변경 사항 없음 */}
                    {!isListEmpty && (
                        <div className="pagination-area">
                            {/* 💡 API 로딩이 끝나지 않았는데 데이터가 부족하다면 로딩 메시지만 표시 */}
                            {!noMoreApiData && !reduxLoading && hasMoreDataToShow ? (
                                <p className="loading-txt">추가 데이터 로딩 중...</p>
                            ) : (
                                isFinishedLoadingAllData && groupedAlerts.length > 0 &&
                                <p className="end-msg">
                                    {filterMonth}개월간 모든 발령 내역을 불러왔습니다.
                                </p>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default AlertStatus;