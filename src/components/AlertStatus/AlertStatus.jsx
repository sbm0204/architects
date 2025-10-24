import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useMemo, useState, useCallback, useRef } from 'react'; // 'useRef' 추가
import { alertStatusIndex } from '../../store/thunks/alertStatusThunk.js'; 
import { setFilterMonth, setCurrentViewPage } from '../../store/slices/alertStatusSlice.js'; // setFilterMonth 액션 추가
import AlertStatusCards from './AlertStatusCards.jsx';
import './AlertStatus.css';
import { groupAlertsByDateAndDistrict, groupCardsByDate } from '../../utils/dataGroupingLogic.js';
import dayjs from 'dayjs';
import Pagination from './Pagination.jsx';

const ITEMS_PER_PAGE = 5;

const MONTH_OPTIONS = [
  { value: 1, label: '1개월 ' },
  { value: 2, label: '2개월' },
  { value: 3, label: '3개월' },
];

const AlertStatus = () => {
  const dispatch = useDispatch(); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // ref 생성
    
  const { 
    list: allAlerts, 
    filteredList,    
    loading: reduxLoading, 
    noMoreApiData, 
    error,
    filterMonth,
    isPeriodSelected,
    currentViewPage, 
  } = useSelector(state => state.alertStatus); 

  const today = dayjs().format('YYYY.MM.DD');

  const handleMonthChange = (month) => {
    dispatch(setFilterMonth(month));
    setIsDropdownOpen(false);
  };

  // 외부 클릭 감지 useEffect
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  useEffect(() => {
    const isInitialFetchNeeded = isPeriodSelected && allAlerts.length === 0;
    const isNextPageFetchNeeded = isPeriodSelected && !reduxLoading && !noMoreApiData;

    if (isInitialFetchNeeded || isNextPageFetchNeeded) {
        dispatch(alertStatusIndex());
      }
  }, [dispatch, reduxLoading, noMoreApiData, isPeriodSelected, allAlerts.length]);
    
  const districtGroups = useMemo(() => {
    return groupAlertsByDateAndDistrict(filteredList);
  }, [filteredList]);
    
  const dateGroups = useMemo(() => {
    return groupCardsByDate(districtGroups);
  }, [districtGroups]);

{/* Pagination ---------------------------------------------------------------------------------- */}
  const totalItems = dateGroups.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    
  const displayedDateGroups = useMemo(() => {
    const start = (currentViewPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

  return dateGroups.slice(start, end);
  }, [dateGroups, currentViewPage]); 

  const isListEmpty = isPeriodSelected 
                      && !reduxLoading 
                      && totalItems === 0 
                      && noMoreApiData; 

  const handlePageChange = useCallback((page) => {
    if (page >= 1 && page <= totalPages) {
        dispatch(setCurrentViewPage(page));
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
    }
  }, [dispatch, totalPages]);

  return (
    <div className="container">

{/* 1. 헤더 영역 (항상 표시) ---------------------------------------------------------------------- */}
      <div className="title-area">
        <h2 className="main-sub-head-title main-head-title">미세먼지 경보</h2>
        <div className="dropdown-container">
          <p className="dropdown-label">
              최근 특보 현황 <br></br>(기준: {today})
          </p>

{/* 1-1. 드랍다운 영역 ---------------------------------------------------------------------- */}
        <div 
          className={`dropdown-select ${isDropdownOpen ? 'open' : ''}`}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          ref={dropdownRef} // ref 할당
        >
          <span className="selected-value">
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
                    handleMonthChange(option.value);}}>
                    {option.label}
                  </li>
                    ))}
              </ul>
            )}
        </div>
      </div>
    </div>

{/* 2. 콘텐츠 영역 (조건부 렌더링) -------------------------------------------------------------------- */}
    <div className="content-wrapper">
      {isPeriodSelected === false && (
        <div className="prompt-msg-box">
          <p className="prompt-msg-txt">
            👉<span>기간 선택</span> 후 <br></br>미세먼지 특보를 확인해보세요.
          </p>
        </div>
      )}
      
{/* 2-1. 콘텐츠 영역 (API issue) ---------------------------------------------------------------------- */}
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

{/* 2-2. 콘텐츠 영역 (loading message) ---------------------------------------------------------------------- */}
          {!error && reduxLoading && totalItems === 0 && (
            <div className="loading-state-container">
              <div className="loading-spinner"></div>
              <p className="loading-txt">데이터 로딩 중...</p>
            </div>
          )}
          
{/* 2-3. 콘텐츠 영역 (if data is empty) ---------------------------------------------------------------------- */}
          {!error && isListEmpty && (
            <div className="empty-msg-box">
              <p className="empty-msg-txt">
                  최근 {filterMonth}개월간 발령 내역이 없습니다.
              </p>
            </div>
          )}
      
{/* 2-3. 콘텐츠 영역 (if data is not empty)---------------------------------------------------------------------- */}
          {(!error && displayedDateGroups.length > 0) && (
            <>
              {displayedDateGroups.map(dateGroup => (
                <div key={dateGroup.date} className="date-group-container"> 
                  <h3 className="date-header">
                      {dayjs(dateGroup.date).format('YYYY.MM.DD')}
                  </h3>
                  <div className="cards-wrapper">
                    {dateGroup.cards.map(cardGroup => (
                      <AlertStatusCards 
                        key={`${cardGroup.dataDate}-${cardGroup.districtName}`} 
                        groupedAlert={cardGroup}
                      /> 
                    ))}
                  </div>
                </div>
              ))}  
                <Pagination 
                    currentPage={currentViewPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </>
          )}
        </>
    )}
    </div>
  </div>
  );
};

export default AlertStatus;