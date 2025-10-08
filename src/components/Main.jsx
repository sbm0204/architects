import { useState } from 'react';
import './Main.css';
import MainDropDown from './MainDropDown.jsx';

const locationData = {
  '서울': ['강남구', '강동구', '서초구'],
  '부산': ['해운대구', '수영구', '동래구'],
  '대구': ['수성구', '달서구', '중구']
};

const regions = Object.keys(locationData);

function Main() {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    setDistricts(locationData[region]);
    setSelectedDistrict(null); // 지역이 바뀌면 지역구 선택은 리셋
  };

  const handleDistrictSelect = (district) => {
    setSelectedDistrict(district);
  };

  return (
      <div className='contents-size'>
        <div style={{ display: 'flex', gap: '10px' }}>
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

        <h1 className='main-contents'>이곳에 contents 입력하세요.</h1>
        <h1 className='main-contents'>이곳에 contents 입력하세요.</h1>
        <h1 className='main-contents'>이곳에 contents 입력하세요.</h1>
        
      </div>
  )
}

export default Main;