import React, { useState, useRef, useEffect } from 'react';
import { getAllAccounts } from '../../axios/api/authService';
import '../../components/styles/DropDown.css';

const SearchableDropdown = ({ label = "Select Account", value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef();
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await getAllAccounts();
        setOptions(response); 
      } catch (error) {
        console.error("Failed to load accounts", error);
      }
    };
    fetchAccounts();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter((option) =>
    option.accountName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (option) => {
    onChange(option); // Pass full object
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
        {value?.accountName || label}
        <span className="arrow">{isOpen ? '▲' : '▼'}</span>
      </div>
      {isOpen && (
        <div className="dropdown-body">
          <input
            type="text"
            className="dropdown-search"
            placeholder="Type to Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="dropdown-options">
            {filteredOptions.map((option, index) => (
              <div
                key={index}
                className="dropdown-option"
                onClick={() => handleSelect(option)}
              >
                {option.accountName}
              </div>
            ))}
            {filteredOptions.length === 0 && (
              <div className="dropdown-no-results">No results found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchableDropdown;
