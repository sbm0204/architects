import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useMemo, useState, useCallback } from 'react'; // 'useState' 추가
import { alertStatusIndex } from '../../store/thunks/alertStatusThunk.js'; 
import { setFilterMonth, setCurrentViewPage } from '../../store/slices/alertStatusSlice.js'; // setFilterMonth 액션 추가
import AlertStatusCards from './AlertStatusCards.jsx';
import './AlertStatus.css';
import { groupAlertsByDateAndDistrict, groupCardsByDate } from '../../utils/dataGroupingLogic.js';
import dayjs from 'dayjs';
import Pagination from './pagination.jsx';

const ITEMS_PER_PAGE = 5;

// 드롭다운 항목 정의
const MONTH_OPTIONS = [
    { value: 1, label: '1개월' },
    { value: 2, label: '2개월' },
    { value: 3, label: '3개월' },
];

const NoPeriodSelectedMessage = () => (
    <div className="prompt-msg-box">
        <p className="prompt-msg-txt">
            👉<span>기간 선택</span> 후 <br></br>미세먼지 특보를 확인해보세요.
        </p>
    </div>
);

// -------------------------------------------------------------
// 메인 컴포넌트: AlertStatus
// -------------------------------------------------------------
const AlertStatus = () => {
    const dispatch = useDispatch(); 
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    const { 
        list: allAlerts, // API 로딩 로직을 위해 유지
        filteredList,    // 💡 기간 필터링/정렬된 최종 목록 (카드 데이터 소스)
        loading: reduxLoading, 
        noMoreApiData, 
        error,
        filterMonth,
        isPeriodSelected,
        currentViewPage, // 💡 새로운 페이지 상태
    } = useSelector(state => state.alertStatus); 

    const today = dayjs().format('YYYY.MM.DD');

    const handleMonthChange = (month) => {
        dispatch(setFilterMonth(month));
        setIsDropdownOpen(false);
    };

    // -------------------------------------------------------------
    // 로직: 데이터 자동 로드 (최초 및 다음 API 페이지 요청)
    // -------------------------------------------------------------
    useEffect(() => {
        const isInitialFetchNeeded = isPeriodSelected && allAlerts.length === 0;
        const isNextPageFetchNeeded = isPeriodSelected && !reduxLoading && !noMoreApiData;

        if (isInitialFetchNeeded || isNextPageFetchNeeded) {
            console.log('Dispatching alertStatusIndex...');
            dispatch(alertStatusIndex());
        }
    }, [dispatch, reduxLoading, noMoreApiData, isPeriodSelected, allAlerts.length]);
    
    // -------------------------------------------------------------
    // 로직: 그룹핑 및 뷰 상태 계산
    // -------------------------------------------------------------
    const districtGroups = useMemo(() => {
        // 💡 필터링된 목록(filteredList)을 사용
        return groupAlertsByDateAndDistrict(filteredList);
    }, [filteredList]);
    
    const dateGroups = useMemo(() => {
        return groupCardsByDate(districtGroups);
    }, [districtGroups]);

    // 💡 페이지네이션 계산
    const totalItems = dateGroups.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    
    const displayedDateGroups = useMemo(() => {
        const start = (currentViewPage - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        return dateGroups.slice(start, end);
    }, [dateGroups, currentViewPage]); // 💡 currentViewPage가 바뀔 때마다 뷰 갱신

    // -------------------------------------------------------------
    // UI 상태 계산 (버그 수정 반영)
    // -------------------------------------------------------------
    
    // API 호출이 완전히 끝났고, 현재 그룹 데이터가 0개일 때만 true
    const isListEmpty = isPeriodSelected 
                        && !reduxLoading 
                        && totalItems === 0 
                        && noMoreApiData; 

    // -------------------------------------------------------------
    // 핸들러: 페이지네이션
    // -------------------------------------------------------------
    const handlePageChange = useCallback((page) => {
        if (page >= 1 && page <= totalPages) {
            dispatch(setCurrentViewPage(page));
            // 페이지 이동 시 스크롤 맨 위로 이동
            window.scrollTo({ top: 0, behavior: 'smooth' }); 
        }
    }, [dispatch, totalPages]);


    return (
        <div className="container">
            {/* ---------------------------------------------------------------------- */}
            {/* 💡 헤더 영역 (항상 표시) */}
            {/* ---------------------------------------------------------------------- */}
            <div className="title-area">
                <h2 className="main-head-title">미세먼지 경보</h2>
                
                <div className="dropdown-container">
                    
                    <p className="dropdown-label">
                        최근 특보 현황 <br></br>(기준: {today})
                    </p>

                    <div 
                        className={`dropdown-select ${isDropdownOpen ? 'open' : ''}`}
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <span className="selected-value">
                            {/* currentButtonLabel 로직을 인라인으로 넣음 */}
                            {isPeriodSelected 
                                ? MONTH_OPTIONS.find(opt => opt.value === filterMonth)?.label || `${filterMonth}개월`
                                : "기간 선택"
                            }
                        </span>
                        <span className="dropdown-arrow">▼</span>
                        
                        {isDropdownOpen && (
                            <ul className="dropdown-menu">
                                {MONTH_OPTIONS.map((option) => (
                                    <li 
                                        key={option.value} 
                                        className={`dropdown-item ${filterMonth === option.value ? 'selected' : ''}`}
                                        onClick={(e) => {
                                            e.stopPropagation(); 
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
            </div>

            {/* ---------------------------------------------------------------------- */}
            {/* 💡 콘텐츠 영역 조건부 렌더링 */}
            {/* ---------------------------------------------------------------------- */}
            <div className="content-wrapper">
            {/* 1. 기간 미선택 상태 */}
            {isPeriodSelected === false && <NoPeriodSelectedMessage />}
            
            {/* 2. 기간 선택 후 콘텐츠 로직 시작 */}
            {isPeriodSelected === true && (
                <>
                    {error && (
                        <div className="error-msg-box">
                            <h3 className="error-msg-title">⚠️ 데이터 로드 실패</h3>
                            <p className="error-msg-txt">
                                오류 발생 - 다시 시도해 주세요.
                            </p>
                            <p className="error-msg-detail">오류 상태: {error}</p>
                            <button 
                                className="retry-btn" 
                                onClick={() => dispatch(setFilterMonth(filterMonth))} // 현재 필터로 재요청
                            >
                                다시 시도
                            </button>
                        </div>
                    )}

                    {/* 2-1. 로딩 상태 */}
                    {!error && reduxLoading && totalItems === 0 && (
                    <div className="loading-state-container">
                        <div className="loading-spinner"></div>
                        <p className="loading-txt">데이터 로딩 중...</p>
                    </div>
                )}
                
                    
                    {/* 2-3. 데이터 없음 상태 */}
                    {/* 🚨 조건 수정: isListEmpty가 true일 때만 표시 */}
                {!error & isListEmpty && (
                    <div className="empty-msg-box">
                        <p className="empty-msg-txt">
                            최근 {filterMonth}개월간 발령 내역이 없습니다.
                        </p>
                    </div>
                )}
            
                    {/* 2-4. 콘텐츠 렌더링 */}
                    {!error & displayedDateGroups.length > 0 && (
                        <>
                            {displayedDateGroups.map(dateGroup => (
                                <div key={dateGroup.date} className="date-group-container"> 
                                    
                                    {/* 날짜 헤더 표시 (2025.09.26 형식) */}
                                    <h3 className="date-header">
                                        {dayjs(dateGroup.date).format('YYYY.MM.DD')}
                                    </h3>

                                    {/* 카드 래퍼와 카드들 표시 */}
                                    <div className="cards-wrapper">
                                        {dateGroup.cards.map(cardGroup => (
                                            <AlertStatusCards 
                                                key={`${cardGroup.dataDate}-${cardGroup.districtName}`} 
                                                groupedAlert={cardGroup}
                                                // dataDate={cardGroup.dataDate}
                                            /> 
                                        ))}
                                    </div>
                                </div>
                            ))}
                            
                            {/* 💡 페이지네이션 UI */}
                                <Pagination 
                                    currentPage={currentViewPage}
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                                />
                        </>
                    )}
                </>
            )}
            </div> {/* 🚨 content-wrapper 끝 */}
        </div>
    );
};

export default AlertStatus;