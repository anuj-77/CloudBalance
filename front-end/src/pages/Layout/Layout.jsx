import React from 'react';
import Header from '../../components/Headerfooter/Header';
import SideBar from '../../components/Sidebar/SideBar';
import Footer from '../../components/Headerfooter/Footer';
import Dashboard from '../../dashboard/Dashboard';
import '../../components/styles/Layout.css'; // 🪄 CSS magic happens here

function Layout() {
  return (
    <div className="layout-container">
      <Header />

      <div className="layout-body">
        
          <SideBar />
        
        <div className="layout-content">
          <Dashboard />
          <Footer />
        </div>
        
      </div>

      
    </div>
  );
}


export default Layout;
