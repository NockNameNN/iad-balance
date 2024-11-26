'use client'
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const ComparisonChart = ({ classDataList, classNames }) => {
  const categories = Object.keys(classDataList[0][0]).filter(key => key !== "Отметка времени" && key !== "Из какого вы класса?");

  const calculateAverages = (classData) => {
    return categories.map(category => {
      const total = classData.reduce((sum, entry) => sum + Number(entry[category]), 0);
      return Number((total / classData.length).toFixed(2));
    });
  };

  const data = categories.map((category, categoryIndex) => {
    const averages = classDataList.map(classData => calculateAverages(classData)[categoryIndex]);
    return {
      category,
      ...Object.fromEntries(classNames.map((className, index) => [className, averages[index]]))
    };
  });

  return (
    <div style={{ width: '100%', height: '400px', margin: '20px' }}>
      <h3>Сравнение колёс баланса</h3>
      <LineChart data={data} width={600} height={300}>
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        {classNames.map((className, index) => (
          <Line key={className} type="monotone" dataKey={className} stroke={['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'][index % 5]} />
        ))}
      </LineChart>
    </div>
  );
};

export default ComparisonChart;
