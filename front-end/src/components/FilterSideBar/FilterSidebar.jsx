import React, { useEffect, useState } from 'react';
import { getFilterOptions, getGroupByOptions } from '../../axios/api/snowflakeService';
import SpinnerLoading from '../SpinnerLoading/SpinnerLoading';
import '../styles/FilterSideBar.css'

const FilterSidebar = ({ selectedFilters, setSelectedFilters }) => {
  const [groupByOptions, setGroupByOptions] = useState([]);
  const [expandedGroup, setExpandedGroup] = useState(null);
  const [filterOptions, setFilterOptions] = useState({});
  const [loadingGroup, setLoadingGroup] = useState(null);

  useEffect(() => {
    const fetchGroupByOptions = async () => {
      try {
        const response = await getGroupByOptions();
        setGroupByOptions(response.data || []);
      } catch (error) {
        console.error('Failed to fetch group by options:', error);
      }
    };
    fetchGroupByOptions();
  }, []);

  const handleGroupClick = async (groupName) => {
    if (expandedGroup === groupName) {
      setExpandedGroup(null);
      return;
    }

    setExpandedGroup(groupName);

    if (!filterOptions[groupName]) {
      try {
        setLoadingGroup(groupName);
        const response = await getFilterOptions(groupName);
        setFilterOptions((prev) => ({
          ...prev,
          [groupName]: response.data || [],
        }));
      } catch (error) {
        console.error('Failed to fetch filters for', groupName, error);
        setFilterOptions((prev) => ({
          ...prev,
          [groupName]: [],
        }));
      } finally {
        setLoadingGroup(null);
      }
    }
  };

  const handleCheckboxChange = (groupName, value) => {
    setSelectedFilters((prev) => {
      const currentSelections = prev[groupName] || [];
      if (currentSelections.includes(value)) {
        return {
          ...prev,
          [groupName]: currentSelections.filter((v) => v !== value),
        };
      } else {
        return {
          ...prev,
          [groupName]: [...currentSelections, value],
        };
      }
    });
  };

  return (
    <div className="filter-sidebar">
      <h3 className="filter-sidebar-title">Group By Filters</h3>

      <div className="group-by-list">
        {groupByOptions.map((group) => (
          <div key={group.id} className="group-item">
            <button
              className="group-button"
              onClick={() => handleGroupClick(group.groupName)}
            >
              {group.displayName}
              {expandedGroup === group.groupName ? ' ▲' : ' ▼'}
            </button>

            {expandedGroup === group.groupName && (
              <div className="filter-options-expanded">
                {loadingGroup === group.groupName ? (
                  <SpinnerLoading />
                ) : (filterOptions[group.groupName] || []).length > 0 ? (
                  (filterOptions[group.groupName]).map((filter, idx) => (
                    <label key={idx} className="filter-option">
                      <input
                        type="checkbox"
                        value={filter}
                        checked={(selectedFilters[group.groupName] || []).includes(filter)}
                        onChange={() => handleCheckboxChange(group.groupName, filter)}
                      />
                      {filter}
                    </label>
                  ))
                ) : (
                  <p>No filters available.</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterSidebar;
