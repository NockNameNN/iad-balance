'use client'
import { useEffect, useState } from 'react';
import CsvUploader from "@/components/CsvUploader";
import BalanceWheel from "@/components/BalanceWheel"; 
import BalanceWheelCreator from '@/components/BalanceWheelCreator';
import ComparisonChart from "@/components/ComparisonChart";

export default function Home() {
  const [classData, setClassData] = useState([]); 
  const [isGrouped, setIsGrouped] = useState(false);
  
  const handleDataUpload = (data) => {
    setClassData(data); 
  };

  const groupByClass = (data) => {
    if (data.length === 0) return {};

    if (isGrouped) {
      return data.reduce((acc, item) => {
        const className = item[Object.keys(item)[1]];
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

  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-3xl text-center">Колесо баланса</h1>
      <CsvUploader onDataUpload={handleDataUpload} />
      <div className="flex gap-2 text-xl">
        <input type="checkbox" checked={isGrouped} onChange={handleCheckboxChange} />
        <label>Сгруппировать</label>
      </div>
      {classNames.length > 1 && (
        <ComparisonChart classDataList={classDataList} classNames={classNames} />
      )}
      {classNames.map(className => (
        <BalanceWheel 
          key={className} 
          classData={groupedData[className]} 
          className={isGrouped ? className : undefined}
        />
      ))}
      <BalanceWheelCreator />
    </div>
  );
}
