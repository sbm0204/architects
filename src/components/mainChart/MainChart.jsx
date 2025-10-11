import { useState } from 'react';
import './MainChart.css';
import MainDropDown from './MainDropDown.jsx';
import AirQualityCard from './AirQualityCard.jsx';
import AirLineChart from './AirLineChart.jsx';

const locationData = {
  '서울': ['강남구', '강동구', '서초구'],
  '부산': ['해운대구', '수영구', '동래구'],
  '대구': ['수성구', '달서구', '중구']
};

const regions = Object.keys(locationData);

function MainChart() {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  // airQualityData를 Main 함수 안으로 이동
  const airQualityData = [
    { title: '초미세먼지', subtitle: '(PM-2.5)', value: '10', unit: 'µg/m³', status: '좋음' },
    { title: '미세먼지', subtitle: '(PM-10)', value: '25', unit: 'µg/m³', status: '보통' },
    { title: '오존', subtitle: '(O₃)', value: '0.03', unit: 'ppm', status: '좋음' },
    { title: '이산화질소', subtitle: '(NO₂)', value: '0.02', unit: 'ppm', status: '좋음' },
    { title: '일산화탄소', subtitle: '(CO)', value: '0.5', unit: 'ppm', status: '보통' },
    { title: '아황산가스', subtitle: '(SO₂)', value: '0.002', unit: 'ppm', status: '나쁨' },
  ];

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    setDistricts(locationData[region]);
    setSelectedDistrict(null); // 지역이 바뀌면 지역구 선택은 리셋
  };

  const handleDistrictSelect = (district) => {
    setSelectedDistrict(district);
  };

  return (
      <div className='contents-size-main-left'>
        <div className='main-container'>
          <div className='main-head-container'>
            <div className='dropdown-btn'>
              <MainDropDown 
                title={selectedRegion || "지역선택"}
                options={regions} 
                onOptionSelect={handleRegionSelect} 
                />
              <MainDropDown 
                title={selectedDistrict || "지역구"}
                options={districts} 
                onOptionSelect={handleDistrictSelect} 
                />
            </div>

            {/* 오늘의 대기질 섹션 */}
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