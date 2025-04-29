import React, { useState } from 'react'
import SearchableDropdown from '../../components/DropDownMenu/DropDownMenu';
import FilterSidebar from '../../components/FilterSideBar/FilterSidebar';
import GroupByPage from '../../components/GroupByPage';
import DateRangeSelector from '../../components/DateRangeSelector/DateRangeSelector';
import CostExplorerGraph from '../../components/CostExplorerGraphs/CostExplorerGraphs';
import useCostDataFetcher from './useCostDataFetcher';
import SpinnerLoading from '../../components/SpinnerLoading/SpinnerLoading';
import { exportToExcel } from '../../roleUtils/exporttoExcel';
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
          {/* 🔥 GroupBy + DateSelectors Row */}
          <div className="top-controls">
            <GroupByPage
              selectedGroupBy={selectedGroupBy}
              setSelectedGroupBy={setSelectedGroupBy}
            />
            <div className="date-range-selectors">
              <DateRangeSelector
                startMonth={startMonth}
                endMonth={endMonth}
                setStartMonth={setStartMonth}
                setEndMonth={setEndMonth}
              />
            </div>
          </div>

          {/* 🔥 Graph / Table Area */}
          <div className="cost-explorer-main-area">
            {loading ? (
              <SpinnerLoading />
            ) : (
              <>
                {/* Render Graph */}
                <CostExplorerGraph
                  costData={costData}
                  groupByKey={selectedGroupBy}
                />

                {/* Export Button only if Data loaded */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                  <button className="export-btn" onClick={() => exportToExcel(costData, selectedGroupBy)}>
                    Export to Excel
                  </button>
                </div>
              </>
            )}
          </div>


        </div>

        {/* 🔥 Sidebar */}
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