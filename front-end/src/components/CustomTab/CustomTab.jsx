import React from 'react';
import '../../components/styles/AWSService.css'

const CustomTab = ({ tabMap, activeTab, onChange }) => {
  return (
    <div className="tabs">
      {tabMap.map((tab, index) => (
        <button
          key={index}
          className={`tab ${activeTab === index ? 'active' : ''}`}
          onClick={() => onChange(index)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default CustomTab;
