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
  const labels = ["10-04", "10-05", "10-06", "10-07", "10-08", "10-09", "10-10" ];

  const options = { 
    responsive: true, 
    interaction: { 
      intersect: false,
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        position: "bottom", 
      },
    },
  };

  
  const pm10Data = { 
    labels, 
    datasets: [
      {
        label: "미세먼지",
        data: [13, 12, 11, 12, 11, 10, 11],
        pointBackgroundColor: "#0CDDFF",
        borderColor: "#000",
      },
    ],
  };
  
  const pm25Data = {
    labels,
    datasets: [
      {
        label: "초미세먼지",
        data: [10, 20, 25, 30, 50, 60, 22],
        backgroundColor: "#FF6384",
        borderColor: "#000",
      },
    ],
  };

  return(
    <div>
      <div>
        <h1>미세먼지</h1>
          <div style={{ width: 250, height: 150 }}>
            <Line options={options} data={pm10Data} />
          </div>
      </div>
      <div>
        <h1>초미세먼지</h1>
          <div style={{ width: 250, height: 150 }}>
            <Line options={options} data={pm25Data}></Line>
          </div>
      </div>
    </div>
  );
};

export default AirLineChart;