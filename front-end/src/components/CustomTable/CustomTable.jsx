import React from 'react';
import '../styles/AWSService.css';

const CustomTable = ({ columns, rows }) => {
  return (
    <table className="custom-table">
      <thead>
        <tr>
          {columns.map((col, i) => <th key={i}>{col}</th>)}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {columns.map((col, j) => <td key={j}>{row[col]}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomTable;
