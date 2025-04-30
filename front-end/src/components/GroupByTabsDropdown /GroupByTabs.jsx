import React, { useState } from "react";

const GroupByTabs = ({ groupByOptions = [], activeTab, setActiveTab }) => {
  const visibleTabs = groupByOptions.slice(0, 5);
  const moreTabs = groupByOptions.slice(5);

  const [showMore, setShowMore] = useState(false);

  const handleTabClick = (index) => {
    setActiveTab(index);
    setShowMore(false);
  };

  return (
    <div className="tabs-container">
      
      {visibleTabs.map((tab, index) => (
        <button
          key={tab.id}
          className={`tab-button ${activeTab === index ? "active" : ""}`}
          onClick={() => handleTabClick(index)}
        >
          {tab.displayName}
        </button>
      ))}

      
      {moreTabs.length > 0 && (
        <div className="more-container">
          <button
            className="service-btn"
            onClick={() => setShowMore((prev) => !prev)}
          >
            More ▾
          </button>

          {showMore && (
            <div className="dropdown">
              {moreTabs.map((tab, idx) => (
                <button
                  key={tab.id}
                  className={`dropdown-tab-button ${activeTab === (idx + visibleTabs.length) ? "active" : ""}`}
                  onClick={() => handleTabClick(idx + visibleTabs.length)}
                >
                  {tab.displayName}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GroupByTabs;
