import React from 'react';
import './AirQualityCard.css';

function AirQualityCard(props) {
  // status prop을 제거하고 기본 props만 받습니다.
  const { title, subtitle, value, unit } = props;

  return (
    <div className="air-quality-card">
      <div className="card-title">{title}</div>
      <div className="card-subtitle">{subtitle}</div>
      
      <div className="card-image-container">
        <div className="card-image-placeholder"></div>
      </div>
      
      <div className="card-value">{value}</div>
      <div className="card-unit">{unit}</div>
    </div>
  );
};

export default AirQualityCard;
