import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function AirBarChart() {
  const { airQuality, status } = useSelector(state => state.airQuality);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // 라벨이 명확하므로 범례는 숨깁니다.
      },
    },
    scales: {
      y: {
        beginAtZero: true, // y축을 0부터 시작
      },
    },
  };

  // 로딩, 실패, 초기 상태 처리
  if (status === 'loading') {
    return <div>차트 데이터 로딩 중...</div>;
  }

  if (status === 'failed') {
    return <div>데이터를 불러오는데 실패했습니다.</div>;
  }
  
  if (!airQuality || airQuality.labels.length === 0) {
    return <div>지역을 선택하면 현재 농도 차트가 표시됩니다.</div>;
  }

  // 가장 마지막 데이터(현재)를 사용합니다.
  const currentPm10 = airQuality.pm10[airQuality.pm10.length - 1];
  const currentPm25 = airQuality.pm25[airQuality.pm25.length - 1];

  const data = {
    labels: ['미세먼지 (PM10)', '초미세먼지 (PM2.5)'],
    datasets: [
      {
        label: '농도 (µg/m³)',
        data: [currentPm10, currentPm25],
        backgroundColor: [
          'rgba(54, 162, 235, 0.5)', // 미세먼지 색상
          'rgba(255, 99, 132, 0.5)',  // 초미세먼지 색상
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ position: 'relative', width: '80vw', height: '25vh' }}>
      <Bar options={options} data={data} />
    </div>
  );
};

export default AirBarChart;