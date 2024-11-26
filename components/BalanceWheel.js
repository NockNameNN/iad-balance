import React from 'react';
import { PolarArea } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend, RadialLinearScale } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend, RadialLinearScale);

const BalanceWheel = ({ classData, className }) => {
  const categories = Object.keys(classData[0]).filter((key, index) => 
    className ? index > 1 : index > 0
  );  

  const averages = categories.map(category => {
    const total = classData.reduce((sum, entry) => sum + Number(entry[category]), 0);
    return Number((total / classData.length).toFixed(2));
  });

  const data = {
    labels: categories,
    datasets: [{
      label: 'Средние значения',
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      data: averages,
    }]
  };

  const options = {
    scales: {
      r: {
        max: 10, 
        ticks: {
          display: true, 
          stepSize: 1,
        },
        grid: {
          color: 'rgba(200, 200, 200, 0.5)', 
        },
      },
    },
  };

  return (
    <div style={{ width: '300px', height: '300px', margin: '20px' }}>
      {className && <h3>{className}</h3>}
      <PolarArea data={data} options={options} />
    </div>
  );
};

export default BalanceWheel;
