import React, { useEffect } from 'react';
import '../styles/DateRangeSelector.css'; 

const DateRangeSelector = ({ startMonth, endMonth, setStartMonth, setEndMonth }) => {
  
  useEffect(() => {
    const currentMonth = new Date().toISOString().substring(0, 7); // "YYYY-MM"
    
    if (!startMonth) setStartMonth(currentMonth);
    if (!endMonth) setEndMonth(currentMonth);
  }, [startMonth, endMonth, setStartMonth, setEndMonth]);

  return (
    <div className="date-range-container">
      <div className="date-picker">
        <label htmlFor="startMonth">Start of Month:</label>
        <input
          type="month"
          id="startMonth"
          value={startMonth}
          onChange={(e) => setStartMonth(e.target.value)}
        />
      </div>

      <div className="date-picker">
        <label htmlFor="endMonth">End of Month:</label>
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
