import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MainChart.css';
import MainDropDown from './MainDropDown.jsx';
import AirQualityCard from './AirQualityCard.jsx';
import AirLineChart from './AirLineChart.jsx';
import { getMapList } from '../../store/thunks/mapAxioThunk.js';


function MainChart() {
  const dispatch = useDispatch();

  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedStationData, setSelectedStationData] = useState(null);

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
  };
  
  const airQualityData = selectedStationData ? [
    { title: '미세먼지', subtitle: '(PM-10)', value: selectedStationData.pm10Value, unit: 'µg/m³' },
    { title: '초미세먼지', subtitle: '(PM-2.5)', value: selectedStationData.pm25Value, unit: 'µg/m³' },
    { title: '오존', subtitle: '(O₃)', value: selectedStationData.o3Value, unit: 'ppm' },
    { title: '이산화질소', subtitle: '(NO₂)', value: selectedStationData.no2Value, unit: 'ppm' },
    { title: '일산화탄소', subtitle: '(CO)', value: selectedStationData.coValue, unit: 'ppm' },
    { title: '아황산가스', subtitle: '(SO₂)', value: selectedStationData.so2Value, unit: 'ppm' },
  ] : [
    { title: '초미세먼지', subtitle: '(PM-2.5)', value: '-', unit: 'µg/m³' },
    { title: '미세먼지', subtitle: '(PM-10)', value: '-', unit: 'µg/m³' },
    { title: '오존', subtitle: '(O₃)', value: '-', unit: 'ppm' },
    { title: '이산화질소', subtitle: '(NO₂)', value: '-', unit: 'ppm' },
    { title: '일산화탄소', subtitle: '(CO)', value: '-', unit: 'ppm' },
    { title: '아황산가스', subtitle: '(SO₂)', value: '-', unit: 'ppm' },
  ];

  return (
      <div className='contents-size-main-left'>
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
            <AirLineChart />
          </div>
        </div>
      </div>
  )
}

export default MainChart;