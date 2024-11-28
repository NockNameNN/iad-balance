'use client'
import { useState } from 'react';
import CsvUploader from "@/components/CsvUploader";
import BalanceWheel from "@/components/BalanceWheel"; 
import ComparisonChart from "@/components/ComparisonChart";
import BalanceWheelCreator from '@/components/BalanceWheelCreator';

export default function Home() {
  const [classData, setClassData] = useState([]); 
  const [isGrouped, setIsGrouped] = useState(false);
  const [groupColumn, setGroupColumn] = useState('');
  const [selectedColumns, setSelectedColumns] = useState([]);
  
  const handleDataUpload = (data) => {
    setClassData(data); 
  };

  const handleGroupColumnChange = (column) => {
    setGroupColumn(column); 
  };

  const handleColumnSelectionChange = (column) => {
    setSelectedColumns(prev => 
      prev.includes(column) ? prev.filter(col => col !== column) : [...prev, column]
    );
  };

  const groupByClass = (data) => {
    if (data.length === 0) return {};

    if (isGrouped && groupColumn) {
      return data.reduce((acc, item) => {
        const className = item[groupColumn];
        if (!acc[className]) {
          acc[className] = [];
        }
        acc[className].push(item);
        return acc;
      }, {});
    } else {
      return { 'Без группировки': data };
    }
  };

  const handleCheckboxChange = (e) => {
    setIsGrouped(e.target.checked);
  };

  const groupedData = groupByClass(classData);
  const classNames = Object.keys(groupedData); 
  const classDataList = Object.values(groupedData); 

  const allColumns = classData.length > 0 ? Object.keys(classData[0]) : [];

  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-3xl text-center">Колесо баланса</h1>
      <CsvUploader onDataUpload={handleDataUpload} onGroupColumnChange={handleGroupColumnChange} />
      <div className="flex gap-2 text-xl">
        <input type="checkbox" checked={isGrouped} onChange={handleCheckboxChange} />
        <label>Сгруппировать</label>
      </div>
      <div>
        <h3>Выберите столбцы для анализа:</h3>
        {allColumns.map(column => (
          <div key={column}>
            <input 
              type="checkbox" 
              checked={selectedColumns.includes(column)} 
              onChange={() => handleColumnSelectionChange(column)} 
            />
            <label>{column}</label>
          </div>
        ))}
      </div>
      {classNames.length > 1 && (
        <ComparisonChart classDataList={classDataList} classNames={classNames} selectedColumns={selectedColumns}  />
      )}
      {classNames.map(className => (
        <BalanceWheel 
          key={className} 
          classData={groupedData[className]} 
          className={isGrouped ? className : undefined}
          groupColumn={groupColumn} 
          selectedColumns={selectedColumns} 
        />
      ))}
      <BalanceWheelCreator />
    </div>
  );
}
