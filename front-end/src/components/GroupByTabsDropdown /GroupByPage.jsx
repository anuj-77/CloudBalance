import React, { useState, useEffect } from 'react';
import GroupByTabs from './GroupByTabs';
import '../styles/GroupByPage.css'

const GroupByPage = ({ groupByOptions = [], selectedGroupBy, setSelectedGroupBy }) => {
    const [activeTab, setActiveTab] = useState(0);
  
    useEffect(() => {
      if (groupByOptions?.length > 0 && !selectedGroupBy) {
        setSelectedGroupBy(groupByOptions[0]?.groupName);
      }
    }, [groupByOptions, selectedGroupBy, setSelectedGroupBy]);
  
    const handleTabChange = (index) => {
      setActiveTab(index);
      setSelectedGroupBy(groupByOptions?.[index]?.groupName);
    };
  
    return (
      <div className="group-by-page">
        <div className="group-tab">
          <h4 className="page-title">Group By:</h4>
          {groupByOptions?.length > 0 ? (
            <GroupByTabs
              groupByOptions={groupByOptions}
              activeTab={activeTab}
              setActiveTab={handleTabChange}
            />
          ) : (
            <p className="loading-text">Loading group by options...</p>
          )}
        </div>
      </div>
    );
  };
  
  export default GroupByPage;
  