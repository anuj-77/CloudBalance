import React, { useState, useEffect } from 'react';
import { getGroupByOptions } from '../axios/api/snowflakeService';
import GroupByTabs from './GroupByTabsDropdown /GroupByTabs';
import '../components/styles/GroupByPage.css'
// import './GroupByPage.css'; // ✅ Importing external CSS

const GroupByPage = ({ selectedGroupBy, setSelectedGroupBy }) => {
    const [groupByOptions, setGroupByOptions] = useState([]);
    const [activeTab, setActiveTab] = useState(0);
  
    useEffect(() => {
        const fetchGroupByOptions = async () => {
            try {
                const res = await getGroupByOptions();
                setGroupByOptions(res.data);

                if (res.data.length > 0) {
                    setSelectedGroupBy(res.data[0].groupName);
                }
            } catch (error) {
                console.error('Failed to fetch group by options', error.message);
            }
        };

        fetchGroupByOptions();
    }, []);

    const handleTabChange = (index) => {
        setActiveTab(index);
        setSelectedGroupBy(groupByOptions[index].groupName);
    };

    return (
        <div className="group-by-page">
            <div className='group-tab'>
                <h4 className="page-title">Group By:</h4>
                {groupByOptions.length > 0 ? (
                    <GroupByTabs
                        groupByOptions={groupByOptions}
                        activeTab={activeTab}
                        setActiveTab={handleTabChange} // ✅ Corrected: direct handler passed
                    />
                ) : (
                    <p className="loading-text">Loading group by options...</p>
                )}
            </div>
        </div>
    );
};

export default GroupByPage;
