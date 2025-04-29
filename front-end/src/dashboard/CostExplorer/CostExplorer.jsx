import React, { useState } from 'react'
import SearchableDropdown from '../../components/DropDownMenu/DropDownMenu';
import FilterSidebar from '../../components/FilterSideBar/FilterSidebar';
import GroupByPage from '../../components/GroupByPage';
import DateRangeSelector from '../../components/DateRangeSelector/DateRangeSelector';
import CostExplorerGraph from '../../components/CostExplorerGraphs/CostExplorerGraphs';
import useCostDataFetcher from './useCostDataFetcher';
import '../../components/styles/CostExplorer.css'

function CostExplorer() {
  const [selected, setSelected] = useState(null);
  const [accounts, setAccounts] = useState([]);

  const [selectedGroupBy, setSelectedGroupBy] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({});
  const [startMonth, setStartMonth] = useState('');
  const [endMonth, setEndMonth] = useState('');

  const { costData, loading } = useCostDataFetcher({
    groupBy: selectedGroupBy,
    filters: selectedFilters,
    startMonth,
    endMonth,
  });

  return (
    <div className="cost-explorer-container">
      <h1 className="cost-explorer-title">Cost Explorer</h1>

      <div className="cost-explorer-below-title">
        <p className="cost-explorer-subtitle">How to always be aware of cost changes and history.</p>
        <div>
          <SearchableDropdown
            label="Select Account"
            options={accounts}
            getOptionLabel={(acc) => acc.accountName}
            getOptionValue={(acc) => acc.roleArn}
            value={selected}
            onChange={setSelected}
          />
          {selected && (
            <p className="selected-account">
              Selected Account: {selected.accountName}
            </p>
          )}
        </div>
      </div>

      <div className="cost-explorer-box">
        <div className="cost-explorer-content">
          <GroupByPage
            selectedGroupBy={selectedGroupBy}
            setSelectedGroupBy={setSelectedGroupBy}
          />
          <DateRangeSelector
            startMonth={startMonth}
            endMonth={endMonth}
            setStartMonth={setStartMonth}
            setEndMonth={setEndMonth}
          />
        </div>
        <div className="cost-explorer-main-area">
          {loading ? (
            <p>Loading Cost Data...</p>
          ) : (
            <CostExplorerGraph
              costData={costData}
              groupByKey={selectedGroupBy}
            />
          )}
        </div>
        <div className="cost-explorer-sidebar">
          <FilterSidebar
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
        </div>

        
      </div>
    </div>
  );
}

export default CostExplorer;