import './MainMap.css';
import { useEffect, useState } from 'react';
import { Map, useKakaoLoader } from 'react-kakao-maps-sdk';
import sido from '../../configs/sido.json';
import proj4 from 'proj4';

// ※ npm install react-kakao-maps-sdk 을 이용하여 라이브러리 설치하여 사용해야 함!

function MainMap() {
  
  useKakaoLoader({
    appkey: '6dc95f71071f60705fb358e778a523b2',
    libraries: ['services'],
  });

  const [map, setMap] = useState(null); // 카카오 맵 인스턴스
  const [geoJsonData, setGeoJsonData] = useState(null); // 불러온 GeoJSON 데이터

  // --- 데이터 로딩 Effect ---
  // 맵이 준비되면 GeoJSON 데이터를 불러옵니다.


  
  useEffect(() => {
    if (!map) return;
    setGeoJsonData(sido);
  }, [map]);
  
  const utmk =
      "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs";
  const wgs84 = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";

  // --- 지도에 다각형을 그리는 Effect ---
  // GeoJSON 데이터가 준비되면 다각형을 그립니다.
  useEffect(() => {
    if (!map || !geoJsonData ) return;

  // 아래 부분에서 미세먼지 데이터와 geoJsonData를 조합하여 지역별 색상을 결정할 수 있다.


    // 다각형을 생성하고 지도에 그리는 헬퍼 함수
    const drawPolygon = (path, fillColor) => {
      const polygon = new window.kakao.maps.Polygon({
        path: path,
        strokeWeight: 3,
        strokeColor: '#8622c0ff',
        strokeOpacity: 0.8,
        strokeStyle: 'solid',
        fillColor: fillColor || '#FFFFFF',
        fillOpacity: 0.5,
      });
      polygon.setMap(map);
    };

    geoJsonData.features.forEach(features => {
      // 나중에 여기서 feature.properties.name_eng (지역명)과 미세먼지 데이터를 비교하여 색상을 결정.
      
      const regionName = features.properties.CTP_KOR_NM;

      let fillColor = '#FFFFFF'; // 기본 색상

      // (예시) 특정 지역에 다른 색상 적용 로직
      if (regionName === '서울') {
        fillColor = '#FF0000';
      } else if (regionName === '대구') {
        fillColor = '#FF0000';
      }

      const geometry = features.geometry;

      if (geometry.type === 'Polygon') {
        geometry.coordinates.forEach(ring => {
          const path = ring.map(coord => {
            const [lon, lat] = proj4(utmk, wgs84, coord);
            return new window.kakao.maps.LatLng(lat, lon);
          });
          drawPolygon(path, fillColor);
        });
        
      } else if (geometry.type === 'MultiPolygon') {
        geometry.coordinates.forEach(polygon => {
          polygon.forEach(ring => {
            const path = ring.map(coord => {
              const [lon, lat] = proj4(utmk, wgs84, coord);
              return new window.kakao.maps.LatLng(lat, lon);
            });
            drawPolygon(path, fillColor);
          });
        });
      }
    });

    // sido.JSON사용
    const gwangju = geoJsonData.features.find(feature => feature.properties.CTP_KOR_NM === '광주');
    if (gwangju) {
      const path = gwangju.geometry.coordinates[0].map(coord => {
        const [lon, lat] = proj4(utmk, wgs84, coord);
        return new window.kakao.maps.LatLng(lat, lon);
      });
      drawPolygon(path, '#FF0000');
    }

  }, [map, geoJsonData]);

  return (
      <div className='contents-size-main-right'>
        <div><h1>전국 미세먼지 농도</h1></div>
        <div className='position'>
          <Map
            center={{ lat: 36.3, lng: 127.8 }}
            className='main-map-manifest'
            level={13}
            onCreate={setMap}
            >
            <div className='main-map-box'>
              <div className="main-map-box-content"><div className='main-map-box-content-circle-good'></div>0~30 좋음</div>
              <div className="main-map-box-content"><div className='main-map-box-content-circle-normal'></div>31~81 보통</div>
              <div className="main-map-box-content"><div className='main-map-box-content-circle-bad'></div>81~150 나쁨</div>
              <div className="main-map-box-content"><div className='main-map-box-content-circle-very-bad'></div>150↑ 매우 나쁨</div>
            </div>
          </Map>
        </div>
        
      </div>
  )
}

export default MainMap;