import React, { useState } from 'react';
import { PolarArea } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend, RadialLinearScale } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend, RadialLinearScale);

const BalanceWheelCreator = () => {
  const [spheres, setSpheres] = useState([{ title: '', value: 0 }]);
  const [showChart, setShowChart] = useState(false);

  const handleAddSphere = () => {
    setSpheres([...spheres, { title: '', value: 0 }]);
  };

  const handleRemoveSphere = (index) => {
    const newSpheres = spheres.filter((_, i) => i !== index);
    setSpheres(newSpheres);
  };

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newSpheres = [...spheres];
    newSpheres[index][name] = name === 'value' ? Math.max(0, Math.min(10, value)) : value;
    setSpheres(newSpheres);
  };

  const handleSubmit = () => {
    setShowChart(true);
  };

  const data = {
    labels: spheres.map(s => s.title),
    datasets: [{
      label: 'Сферы жизни',
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      data: spheres.map(s => s.value),
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
    <div>
      <h2 className='text-2xl'>Создайте своё колесо баланса</h2>
      {spheres.map((sphere, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <input
            className='text-black'
            type="text"
            name="title"
            placeholder="Название сферы"
            value={sphere.title}
            onChange={(e) => handleChange(index, e)}
          />
          <input
            className='text-black mx-2'
            type="number"
            name="value"
            value={sphere.value}
            onChange={(e) => handleChange(index, e)}
            min="0"
            max="10"
          />
          <button onClick={() => handleRemoveSphere(index)}>Удалить</button>
        </div>
      ))}
      <button className='mr-10' onClick={handleAddSphere}>Добавить сферу</button>
      <button onClick={handleSubmit} style={{ marginTop: '20px' }}>Готово</button>

      {showChart && (
        <div style={{ width: '300px', height: '300px', margin: '20px' }}>
          <h3 className='text-2xl'>Ваше колесо баланса</h3>
          <PolarArea data={data} options={options} />
        </div>
      )}
    </div>
  );
};

export default BalanceWheelCreator;
