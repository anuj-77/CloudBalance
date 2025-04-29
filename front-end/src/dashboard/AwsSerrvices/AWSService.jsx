import React, { useEffect, useState } from 'react';
import SearchableDropdown from '../../components/DropDownMenu/DropDownMenu';
import CustomTab from '../../components/CustomTab/CustomTab';
import CustomTable from '../../components/CustomTable/CustomTable';
import SpinnerLoading from '../../components/SpinnerLoading/SpinnerLoading';
import { tabMap, awsServiceColumns } from './awsServiceConfig';
import { getAllAccounts, getAwsServiceData } from '../../axios/api/authService';
import '../../components/styles/AWSService.css';

function AWSService() {
  const [accounts, setAccounts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getAllAccounts();
        setAccounts(res);
      } catch {
        setAccounts([]);
      }
    })();
  }, []);

  useEffect(() => {
    if (selected?.roleArn) {
      fetchServiceData(tabMap[tabIndex].key, selected.roleArn);
    }
  }, [selected, tabIndex]);

  const fetchServiceData = async (type, roleArn) => {
    try {
      setLoading(true);
      const res = await getAwsServiceData(type, roleArn);
      setData(Array.isArray(res) ? res : []);
    } catch (err) {
      console.error("Error fetching service data:", err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="aws-container">
      <h1 className="aws-title">AWS Service</h1>

      <div className="aws-below-title">
        <p className="aws-subtitle">Manage your AWS Services here.</p>

        <div >
          <SearchableDropdown
            label="Select Account"
            options={accounts}
            getOptionLabel={(acc) => acc.accountName}
            getOptionValue={(acc) => acc.r}
            value={selected}
            onChange={setSelected}
          />
          {selected && (
            <p className='slected-account'>
              Selected Account: {selected.accountName}
            </p>
          )}
        </div>
      </div>
      <div className='aws-service-box'>
        <CustomTab tabMap={tabMap} activeTab={tabIndex} onChange={setTabIndex} />

        {loading ? (
          <SpinnerLoading />
        ) : (
          <CustomTable
            columns={awsServiceColumns[tabMap[tabIndex].key]}
            rows={data}
          />
        )}
      </div>
    </div>
  );
}

export default AWSService;
