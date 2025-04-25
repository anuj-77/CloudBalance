import React, { useState } from 'react';
import Header from '../../components/Headerfooter/Header';
import SideBar from '../../components/Sidebar/SideBar';
import Footer from '../../components/Headerfooter/Footer';
import Dashboard from '../../dashboard/Dashboard';
import '../../components/styles/Layout.css'; 

function Layout() {

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);


  return (
    <div className="layout-container">
      <Header />

      <div className="layout-body">
        <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        <div className="layout-content">
          <Dashboard />
          <Footer />
          
        </div>

      </div>

    </div>
  );
}


export default Layout;
