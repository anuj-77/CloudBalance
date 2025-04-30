import React, { useState, useEffect } from 'react';
import SearchableDropdown from '../../components/DropDownMenu/DropDownMenu';
import FilterSidebar from '../../components/FilterSideBar/FilterSidebar';
import GroupByPage from '../../components/GroupByTabsDropdown /GroupByPage';
import DateRangeSelector from '../../components/DateRangeSelector/DateRangeSelector';
import CostExplorerGraph from '../../components/CostExplorerGraphs/CostExplorerGraphs';
import SpinnerLoading from '../../components/SpinnerLoading/SpinnerLoading';
import { exportToExcel } from '../../roleUtils/exporttoExcel';
import { getGroupByOptions, getCostData } from '../../axios/api/snowflakeService';
import '../../components/styles/CostExplorer.css';

const CostExplorer = () => {
  const [selected, setSelected] = useState(null);
  const [accounts, setAccounts] = useState([]);

  const [groupByOptions, setGroupByOptions] = useState([]);
  const [selectedGroupBy, setSelectedGroupBy] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({});
  const [startMonth, setStartMonth] = useState('');
  const [endMonth, setEndMonth] = useState('');
  const [costData, setCostData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGroupByOptions = async () => {
      try {
        const res = await getGroupByOptions();
        const options = res.data || [];
        setGroupByOptions(options);
        if (options.length > 0) setSelectedGroupBy(options[0]?.groupName);
      } catch (error) {
        console.error('Failed to fetch group-by options', error);
      }
    };
    fetchGroupByOptions();
  }, []);

  useEffect(() => {
    const fetchCostData = async () => {
      if (!selectedGroupBy || !startMonth || !endMonth) return;
      try {
        setLoading(true);
        const payload = {
          groupBy: selectedGroupBy,
          filters: selectedFilters,
          startMonth,
          endMonth,
        };
        const res = await getCostData(payload);
        setCostData(res?.data || []);
      } catch (err) {
        console.error('Failed to fetch cost data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCostData();
  }, [selectedGroupBy, selectedFilters, startMonth, endMonth]);

  return (
    <div className="cost-explorer-container">
      <h1 className="cost-explorer-title">Cost Explorer</h1>

      <div className="cost-explorer-below-title">
        <p className="cost-explorer-subtitle">Always be aware of your cost history and trends.</p>
        <div>
          <SearchableDropdown
            label="Select Account"
            options={accounts}
            getOptionLabel={(acc) => acc?.accountName}
            getOptionValue={(acc) => acc?.roleArn}
            value={selected}
            onChange={setSelected}
          />
          {selected?.accountName && (
            <p className="selected-account">Selected Account: {selected.accountName}</p>
          )}
        </div>
      </div>

      <div className="cost-explorer-box">
        <div className="cost-explorer-content">
          <div className="top-controls">
            <GroupByPage
              groupByOptions={groupByOptions}
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
              <SpinnerLoading />
            ) : (
              <>
                <CostExplorerGraph costData={costData} groupByKey={selectedGroupBy} />
                {costData?.length > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                    <button className="export-btn" onClick={() => exportToExcel(costData, selectedGroupBy)}>
                      Export to Excel
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div className="cost-explorer-sidebar">
          <FilterSidebar
            groupByOptions={groupByOptions}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
        </div>
      </div>
    </div>
  );
};

export default CostExplorer;
