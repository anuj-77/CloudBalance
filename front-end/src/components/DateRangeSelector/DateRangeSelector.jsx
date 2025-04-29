// src/components/DateRangeSelector/DateRangeSelector.jsx
import React from 'react';
import '../styles/DateRangeSelector.css'; // ✅ External CSS

const DateRangeSelector = ({ startMonth, endMonth, setStartMonth, setEndMonth }) => {
  return (
    <div className="date-range-container">
      <div className="date-picker">
        <label htmlFor="startMonth">Start Month:</label>
        <input
          type="month"
          id="startMonth"
          value={startMonth}
          onChange={(e) => setStartMonth(e.target.value)}
        />
      </div>

      <div className="date-picker">
        <label htmlFor="endMonth">End Month:</label>
        <input
          type="month"
          id="endMonth"
          value={endMonth}
          onChange={(e) => setEndMonth(e.target.value)}
        />
      </div>
    </div>
  );
};

export default DateRangeSelector;
