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

function MainChart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const moveGuide = () => {navigate('/guideLine')}


  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedStationData, setSelectedStationData] = useState(null);

  // 화면 크기에 따른 상태 추가 (800px 기준으로 변경)
  const [isMobile, setIsMobile] = useState(window.matchMedia('(max-width: 800px)').matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 800px)');
    const handleResize = (e) => setIsMobile(e.matches);

    mediaQuery.addEventListener('change', handleResize);

    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  const mapList = useSelector(state => state.mapAxio.mapList);
  const sidoRegions = mapList?.items ? [...new Set(mapList.items.map(item => item.sidoName))] : [];
  const selectedItems = mapList?.items?.filter(val => val.sidoName === selectedRegion);
  const selectedStations = selectedItems?.map(item => item.stationName);
  const sortStations = selectedStations?.sort((a, b) => a > b ? 1 : -1);

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    setSelectedDistrict(null); 
    setSelectedStationData(null);
    dispatch(getMapList(region));
  };

  const handleDistrictSelect = (district) => {
    setSelectedDistrict(district);
    const stationData = selectedItems.find(item => item.stationName === district);
    setSelectedStationData(stationData);
    dispatch(getAirQuality({ stationName: district }));
  };
  
  const airQualityData = selectedStationData ? [
    { title: '미세먼지', subtitle: '(PM-10)', value: selectedStationData.pm10Value || '-', unit: 'µg/m³' },
    { title: '초미세먼지', subtitle: '(PM-2.5)', value: selectedStationData.pm25Value || '-', unit: 'µg/m³' },
    { title: '오존', subtitle: '(O₃)', value: selectedStationData.o3Value || '-', unit: 'ppm' },
    { title: '이산화질소', subtitle: '(NO₂)', value: selectedStationData.no2Value || '-', unit: 'ppm' },
    { title: '일산화탄소', subtitle: '(CO)', value: selectedStationData.coValue || '-', unit: 'ppm' },
    { title: '아황산가스', subtitle: '(SO₂)', value: selectedStationData.so2Value || '-', unit: 'ppm' },
  ] : [
    { title: '초미세먼지', subtitle: '(PM-2.5)', value: '-', unit: 'µg/m³' },
    { title: '미세먼지', subtitle: '(PM-10)', value: '-', unit: 'µg/m³' },
    { title: '오존', subtitle: '(O₃)', value: '-', unit: 'ppm' },
    { title: '이산화질소', subtitle: '(NO₂)', value: '-', unit: 'ppm' },
    { title: '일산화탄소', subtitle: '(CO)', value: '-', unit: 'ppm' },
    { title: '아황산가스', subtitle: '(SO₂)', value: '-', unit: 'ppm' },
  ];

  
    const statusImages = {
      '좋음': good,
      '보통': moderate,
      '나쁨': bad,
      '매우나쁨': veryBad,
      '정보없음': caution,
    };

  const airQualityDataPM10 = selectedStationData ? selectedStationData.pm10Value : null; 
  const levelLabel =  getDustLevel(airQualityDataPM10, 'PM10').label
  const statusImage = statusImages[levelLabel] || caution; 
  
  const textJson = (val) => {
  if (val === dustJson.good.status) {
    return dustJson.good
  } else if (val === dustJson.moderate.status) {
    return dustJson.moderate
  } else if (val === dustJson.bad.status) {
    return dustJson.bad
  } else if (val === dustJson.veryBad.status) {
    return dustJson.veryBad
  } else {
    return dustJson.noneData
  }
}
  const textJsondata = textJson(levelLabel)

  return (
      <div className='contents-size-main-left'>
        <div>


          <div className='main-container'>
            <div className='main-head-container'>
              <div className='dropdown-btn'>
                <MainDropDown 
                  title={selectedRegion || "지역"}
                  options={sidoRegions} 
                  onOptionSelect={handleRegionSelect} 
                  />
                <MainDropDown 
                  title={selectedDistrict || "상세지역"}
                  options={sortStations} 
                  onOptionSelect={handleDistrictSelect}
                  />
              </div>

              <div className="air-quality-section">
                <h2 className="air-quality-title">오늘의 대기질</h2>
              </div>
                <div className="card-container">
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
              ) : (
                <div className="chart-placeholder" style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
                  <p>상세지역을 선택하시면 시간대별 대기질 현황을 볼 수 있습니다.</p>
                </div>
              )}
            </div>
          </div>

          <div className='main-guide-container'>
            <h1 className='main-guide-tile'>행동 요령</h1>
                  <div className='main-guide-card-continer'>
                    <div>
                        <img src={statusImage} alt="" className='main-guide-image' />
                    </div>
                    <div className='main-guide-card'>
                      <div className='main-guide-card-sensitive'>
                        <p className='main-guide-card-sub-title'>민감군</p>
                        <p className='main-guide-sensitive-content'>
                          {textJsondata && textJsondata.sensitive[0]}
                        </p>
                        <p className='main-guide-sensitive-content'>
                          {textJsondata && textJsondata.sensitive[1]}
                        </p>
                      </div>
                        <hr className='line'/>
                      <div>
                        <p className='main-guide-card-sub-title'>일반군</p>
                        <p className='main-guide-public-content'>
                          {textJsondata && textJsondata.public[0]}
                        </p>
                        <p className='main-guide-public-content'>
                          {textJsondata && textJsondata.public[1]}
                        </p>
                      </div>
                    </div>
                    <div className='main-guide-button'>
                        <p className='main-button' onClick={moveGuide}>더 많은 요령</p>
                    </div>
                  </div>
          </div>
            
        </div>
      </div>
  )
}

export default MainChart;