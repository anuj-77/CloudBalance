import React, { useEffect, useState } from 'react';
import '../components/styles/Dashboard.css';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

function Dashboard() {

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname === '/dashboard') {
            navigate('/dashboard/CostExplorer'); 
        }
    }, [location, navigate]);

    return (
        <div >
            <Outlet />
        </div>
    );
}

export default Dashboard;
