import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MainChart.css';
import MainDropDown from './MainDropDown.jsx';
import AirQualityCard from './AirQualityCard.jsx';
import AirLineChart from './AirLineChart.jsx';
import AirBarChart from './AirBarChart.jsx';
import { getMapList } from '../../store/thunks/mapAxioThunk.js';
import { getAirQuality } from '../../store/thunks/airQualityThunk.js';
import good from '../../assets/good.png';
import moderate from '../../assets/moderate.png';
import bad from '../../assets/bad.png';
import veryBad from '../../assets/very-bad.png';
import caution from '../../assets/Caution.png';
import { getDustLevel } from '../../utils/getDustLevel.js';
import dustJson from '../../configs/guide-data.js';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { getLocation } from '../../store/thunks/locationThunk.js';
import { setRegion, setDistrict } from '../../store/slices/locationSlice.js';

function MainChart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const moveGuide = () => { navigate('/guideLine'); };

  const todayDate = dayjs().format('YY-MM-DD');
  const currentHour = dayjs().format('HH');

  const [selectedRegion, setSelectedRegion] = useState('서울');
  const [selectedDistrict, setSelectedDistrict] = useState('종로구');
  const [selectedStationData, setSelectedStationData] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [nearbyFlg, setNearbyFlg] = useState(true);
  const [isMobile, setIsMobile] = useState(window.matchMedia('(max-width: 800px)').matches);

  const mapList = useSelector(state => state.mapAxio.mapList);
  const { nearbyStations } = useSelector(state => state.location);

  const handleToggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  // 위치 허용 시 현재 위치 불러오기
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          dispatch(getLocation({ lat, lon }));
        },
        (error) => {
          console.error(error);
          // 위치 권한 거부 시 기본값 사용
        }
      );
    }
  }, [dispatch]);

  // 초기 기본값: 서울 종로구 데이터
  useEffect(() => {
    dispatch(getMapList());
    dispatch(getAirQuality({ stationName: '종로구' }));
  }, [dispatch]);

  // 화면 크기 감지
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 800px)');
    const handleResize = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener('change', handleResize);
    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

// 위치 기반 측정소 데이터 적용 + 차트 반영
useEffect(() => {
  if (nearbyFlg && nearbyStations?.items?.length > 0 && mapList?.items?.length > 0) {
    const closestStationName = nearbyStations.items[0].Station_name;
    const match = mapList?.items.find(item => item.stationName === closestStationName);

    if (match) {
      // 지역, 상세지역 상태 업데이트
      dispatch(setRegion(match.sidoName));
      setSelectedRegion(match.sidoName);
      dispatch(setDistrict(match.stationName));
      setSelectedDistrict(match.stationName);

      // 차트용 대기질 데이터 요청 (즉시 반영)
      dispatch(getAirQuality({ stationName: match.stationName }));
    }

    setNearbyFlg(false);
  }
}, [nearbyStations, mapList, dispatch, nearbyFlg]);

  // mapList 변경 시 stationData 동기화
  useEffect(() => {
    if (mapList?.items && selectedRegion && selectedDistrict) {
      const stationData = mapList.items.find(
        (item) => item.sidoName === selectedRegion && item.stationName === selectedDistrict
      );
      if (stationData) {
        setSelectedStationData(stationData);
      }
    }
  }, [mapList, selectedRegion, selectedDistrict]);

  // 지역 변경 시 상세지역 자동 선택 (가나다순 첫 번째)
  useEffect(() => {
    if (mapList?.items && selectedRegion && !selectedDistrict) {
      const selectedItems = mapList.items.filter(item => item.sidoName === selectedRegion);
      if (selectedItems.length > 0) {
        const sortStations = selectedItems
          .map(item => item.stationName)
          .sort((a, b) => a.localeCompare(b)); // 가나다순
        const firstDistrict = sortStations[0];
        setSelectedDistrict(firstDistrict);
        dispatch(getAirQuality({ stationName: firstDistrict }));

        const stationData = selectedItems.find(item => item.stationName === firstDistrict);
        if (stationData) setSelectedStationData(stationData);
      }
    }
  }, [mapList, selectedRegion, dispatch, selectedDistrict]);

  // Dropdown 선택 핸들러
  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    setSelectedDistrict(null); // 상세지역 초기화
    setSelectedStationData(null);
    dispatch(getMapList());
  };

  const handleDistrictSelect = (district) => {
    setSelectedDistrict(district);
    const stationData = mapList?.items?.find(item => item.stationName === district);
    if (stationData) {
      setSelectedStationData(stationData);
      dispatch(getAirQuality({ stationName: district }));
    }
  };

  // 지역/상세지역 리스트
  const customSidoOrder = ['서울', '부산', '대구', '인천', '광주', '대전', '울산', '세종', '경기', '강원', '충남', '충북', '전남', '전북', '경남', '경북', '제주'];
  const sidoRegions = mapList?.items ? [...new Set(mapList.items.map(item => item.sidoName))].sort((a, b) => {
    const indexA = customSidoOrder.indexOf(a);
    const indexB = customSidoOrder.indexOf(b);
    if (indexA === -1 && indexB === -1) return a.localeCompare(b);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  }) : [];
  const selectedItems = mapList?.items?.filter(val => val.sidoName === selectedRegion);
  const selectedStations = selectedItems?.map(item => item.stationName);
  const sortStations = selectedStations?.sort((a, b) => a.localeCompare(b));

  // 대기질 카드 데이터
  const airQualityData = selectedStationData ? [
    { title: '미세먼지', subtitle: '(PM-10)', value: selectedStationData.pm10Value || '-', unit: 'µg/m³' },
    { title: '초미세먼지', subtitle: '(PM-2.5)', value: selectedStationData.pm25Value || '-', unit: 'µg/m³' },
    { title: '오존', subtitle: '(O₃)', value: selectedStationData.o3Value || '-', unit: 'ppm' },
    { title: '이산화질소', subtitle: '(NO₂)', value: selectedStationData.no2Value || '-', unit: 'ppm' },
    { title: '일산화탄소', subtitle: '(CO)', value: '-', unit: 'ppm' },
    { title: '아황산가스', subtitle: '(SO₂)', value: '-', unit: 'ppm' },
  ] : [
    { title: '초미세먼지', subtitle: '(PM-2.5)', value: '-', unit: 'µg/m³' },
    { title: '미세먼지', subtitle: '(PM-10)', value: '-', unit: 'µg/m³' },
    { title: '오존', subtitle: '(O₃)', value: '-', unit: 'ppm' },
    { title: '이산화질소', subtitle: '(NO₂)', value: '-', unit: 'ppm' },
    { title: '일산화탄소', subtitle: '(CO)', value: '-', unit: 'ppm' },
    { title: '아황산가스', subtitle: '(SO₂)', value: '-', unit: 'ppm' },
  ];

  // 대기질 이미지 및 텍스트 처리
  const statusImages = {
    '좋음': good,
    '보통': moderate,
    '나쁨': bad,
    '매우나쁨': veryBad,
    '정보없음': caution,
  };

  const airQualityDataPM10 = selectedStationData ? selectedStationData.pm10Value : null;
  const levelLabel = getDustLevel(airQualityDataPM10, 'PM10').label;
  const statusImage = airQualityDataPM10 ? statusImages[levelLabel] : caution;

  const textJson = (val) => {
    if (val === dustJson.good.status) return dustJson.good;
    else if (val === dustJson.moderate.status) return dustJson.moderate;
    else if (val === dustJson.bad.status) return dustJson.bad;
    else if (val === dustJson.veryBad.status) return dustJson.veryBad;
    else return dustJson.noneData;
  };

  const textJsondata = airQualityDataPM10 ? textJson(levelLabel) : dustJson.noneData;

  return (
    <div className='contents-size-main-left'>
      <div className='main-container'>
        <div className='main-head-container'>
          <div className="air-quality-section" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p className='main-head-title'>오늘의 대기질</p>
            <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#666666', marginTop: '5px' }}>
              {todayDate} {currentHour}시
            </span>
          </div>
          <div className='dropdown-btn'>
            <MainDropDown
              title={selectedRegion || "지역"}
              options={sidoRegions}
              onOptionSelect={handleRegionSelect}
              variant="region"
              isOpen={openDropdown === 'region'}
              toggleDropdown={() => handleToggleDropdown('region')}
            />
            <MainDropDown
              title={selectedDistrict || "상세지역"}
              options={sortStations}
              onOptionSelect={handleDistrictSelect}
              variant="district"
              isOpen={openDropdown === 'district'}
              toggleDropdown={() => handleToggleDropdown('district')}
            />
          </div>
          <div className='card-container'>
            {airQualityData.map((data, index) => (
              <AirQualityCard
                key={index}
                title={data.title}
                subtitle={data.subtitle}
                value={data.value}
                unit={data.unit}
              />
            ))}
          </div>
        </div>

        <div className='chart-padding'>
          {selectedStationData ? (
            isMobile ? <AirBarChart /> : <AirLineChart />
          ) : 
            <div className="chart-placeholder">
            </div>
          }
        </div>
      </div>

      <div className='main-guide-container'>
        <h1 className='main-guide-title main-head-title'>행동 요령</h1>
        <div className='main-guide-card-container'>
          <div>
            <img src={statusImage} alt="" className='main-guide-image' />
          </div>
          <div className='main-guide-card'>
            <div className='main-guide-card-sensitive'>
              <p className='main-guide-card-sub-title'>민감군</p>
              <div className='main-guide-sensitive-content-box'>
                <div className={`main-guide-sensitive-content ${textJsondata?.public[0] ? 'pseudo' : ''}`}>
                  {textJsondata && textJsondata.sensitive[0]}
                </div>
                <div className={`main-guide-sensitive-content ${textJsondata?.public[1] ? 'pseudo' : ''}`}>
                  {textJsondata && textJsondata.sensitive[1]}
                </div>
              </div>
            </div>
            <hr className='line' />
            <div className='main-guide-card-public'>
              <p className='main-guide-card-sub-title'>일반군</p>
              <div className='main-guide-public-content-box'>
                <div className={`main-guide-public-content ${textJsondata?.public[0] ? 'pseudo' : ''}`}>
                  {textJsondata && textJsondata.public[0]}
                </div>
                <div className={`main-guide-public-content ${textJsondata?.public[1] ? 'pseudo' : ''}`}>
                  {textJsondata && textJsondata.public[1]}
                </div>
              </div>
            </div>
          </div>
          <div className='main-guide-button'>
            <p className='main-button' onClick={moveGuide}>더 많은 요령</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainChart;
