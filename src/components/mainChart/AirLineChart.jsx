import { useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function AirLineChart() {
  const { airQuality, status } = useSelector(state => state.airQuality);

  const options = { 
    responsive: true,
    maintainAspectRatio: false,
    interaction: { 
      intersect: false,
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
            y: {
              
            }    },
    plugins: {
      legend: {
        display: false, 
      },
    },
    layout: {
      padding: {
        top: 30
      }
    }
  };

  // 로딩 및 에러, 초기 상태 처리
  if (status === 'loading') {
    return <div style={{width: '14vw', height: '57.2vh', textAlign: 'center', paddingTop: '30vh' }}>차트 데이터 로딩 중...📊</div>;
  }

  if (status === 'failed') {
    return <div>데이터를 불러오는데 실패했습니다.</div>;
  }
  
  if (!airQuality || airQuality.labels.length === 0) {
    return <div>지역을 선택하면 시간별 농도 차트가 표시됩니다.</div>;
  }

  const labels = airQuality.labels;

  const pm10Data = { 
    labels, 
    datasets: [
      {
        label: "미세먼지",
        data: airQuality.pm10,
        pointBackgroundColor: "#66c6ff",
        borderColor: "#000",
      },
    ],
  };
  
  const pm25Data = {
    labels,
    datasets: [
      {
        label: "초미세먼지",
        data: airQuality.pm25,
        backgroundColor: "#FF6384",
        borderColor: "#000",
      },
    ],
  };

  return(
    <div style={{paddingTop: '70px'}}>
      <div style={{paddingBottom: '10px'}}>
        <p style={{fontSize:'25px', fontWeight:'600'}}>미세먼지</p>
        <div style={{position: 'relative', width: '14vw', height: '20vh', marginTop: '10px',}}>
          <div style={{ position: 'absolute', top: '-5px', left: '0', fontSize: '12px', color: '#666' }}>µg/m³</div>
          <Line options={options} data={pm10Data} />
        </div>
      </div>
      <div>
        <p style={{fontSize: '25px', fontWeight:'600'}}>초미세먼지</p>
        <div style={{position: 'relative', width: '14vw', height: '20vh', marginTop: '10px'}}>
          <div style={{ position: 'absolute', top: '-5px', left: '0', fontSize: '12px', color: '#666' }}>µg/m³</div>
          <Line options={options} data={pm25Data}></Line>
        </div>
      </div>
    </div>
  );
};

export default AirLineChart;