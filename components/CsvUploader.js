import { useState } from 'react';
import Papa from 'papaparse';

const CsvUploader = ({ onDataUpload, onGroupColumnChange }) => {
  const [data, setData] = useState([]);
  const [groupColumn, setGroupColumn] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: (results) => {
          console.log(results);
          setData(results.data);
          onDataUpload(results.data);
        },
        header: true,
      });
    }
  };

  const handleGroupColumnChange = (event) => {
    const selectedColumn = event.target.value;
    setGroupColumn(selectedColumn);
    onGroupColumnChange(selectedColumn);
  };

  return (
    <div>
      <h2 className='text-2xl'>Загрузить CSV-файл</h2>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      {data.length > 0 && (
        <div>
          <h3>Данные из CSV:</h3>
          <div className="mb-4">
            <label htmlFor="groupColumn" className="mr-2">Выберите столбец для группировки:</label>
            <select id="groupColumn" value={groupColumn} onChange={handleGroupColumnChange} className="p-2 text-black">
              <option value="">Столбец не выбран</option>
              {Object.keys(data[0]).map((key) => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
          </div>
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th key={key} className="border border-gray-300 px-4 py-2 text-center">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, idx) => (
                    <td key={idx} className="border border-gray-300 px-4 py-2 text-center">
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CsvUploader;
