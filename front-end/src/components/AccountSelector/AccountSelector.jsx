import React, { useEffect, useState } from 'react';
import { getAllAccounts } from '../../axios/api/authService'; // or wherever your call is
import '../styles/AccountSelector.css'; 

const AccountSelector = ({ selectedAccounts, setSelectedAccounts }) => {
  const [allAccounts, setAllAccounts] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await getAllAccounts(); 
        setAllAccounts(response);
      } catch (error) {
        console.error("Failed to load accounts", error);
      }
    };
    fetchAccounts();
  }, []);

  const toggleAccount = (id) => {
    setSelectedAccounts((prev) =>
      prev.includes(id) ? prev.filter((accId) => accId !== id) : [...prev, id]
    );
  };

  return (
    <div className="account-selector-container">
      <div className="account-list">
        <h4>Available Accounts</h4>
        {allAccounts.map((account) => (
          <div key={account.id}>
            <label>
              <input
                type="checkbox"
                checked={selectedAccounts.includes(account.id)}
                onChange={() => toggleAccount(account.id)}
              />
              {account.accountName}
            </label>
          </div>
        ))}
      </div>

      <div className="account-selected">
        <h4>Selected Accounts</h4>
        <ul>
          {allAccounts
            .filter((acc) => selectedAccounts.includes(acc.id))
            .map((acc) => (
              <li key={acc.id}>{acc.accountName}</li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default AccountSelector;
