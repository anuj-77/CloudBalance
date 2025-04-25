// src/components/Sidebar/SideBar.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import sideBarItems from '../Sidebar/SideBarConfig';
import { useSelector } from 'react-redux';
import '../styles/SideBar.css';

function SideBar({ isOpen, toggleSidebar }) {
  const navigate = useNavigate();
  const location = useLocation();
  const role = useSelector((state) => state.user.role);



  const filteredItems = sideBarItems.filter(item => {
    if (!item.path) return false;

    switch (role) {
      case 'ADMIN':
        return true;

      case 'READ_ONLY':
        return item.readOnly === true;

      case 'CUSTOMER':
        return ['/dashboard/AwsService', '/dashboard/CostExplorer'].includes(item.path);

      default:
        return false;
    }
  });

  return (

    <div className={`sidebar-container ${isOpen ? 'expanded' : 'collapsed'}`}>
  <div className="sidebar-toggle-align">
    <button className="sidebar-toggle" onClick={toggleSidebar}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="white"
        viewBox="0 0 24 24"
      >
        <path
          d="M3 6h18M3 12h18M3 18h18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </button>
  </div>

  <ul className="sidebar-list">
    {filteredItems.map((item) => (
      <li key={item.path}>
        <button
          onClick={() => navigate(item.path)}
          className={`sidebar-button ${location.pathname === item.path ? 'active' : ''}`}
        >
          <span className="sidebar-icon-wrapper">
            <img src={item.icon} alt={`${item.name} icon`} className="sidebar-custom-icon" />
          </span>
          <span className="sidebar-label">{item.name}</span>
        </button>
      </li>
    ))}
  </ul>
</div>

  );
}

export default SideBar;
