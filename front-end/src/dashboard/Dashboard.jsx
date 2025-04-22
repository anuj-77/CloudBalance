import React, { useEffect, useState } from 'react';
import '../components/styles/Dashboard.css';
import { Outlet, useLocation } from 'react-router-dom';

function Dashboard() {
    const location = useLocation();
    const [firstVisit, setFirstVisit] = useState(true);
    const [currentTabName, setCurrentTabName] = useState('');

    useEffect(() => {
        // Skip the welcome message after first render
        if (location.pathname !== '/dashboard') {
            setFirstVisit(false);
        }

        // Extract the tab name from the URL
        const pathParts = location.pathname.split('/');
        if (pathParts.length > 2) {
            const tabRaw = pathParts[2];
            const tabName = tabRaw.replace(/([A-Z])/g, ' $1') // Add space before capital letters
                .replace(/-/g, ' ') // Handle kebab-case
                .replace(/^./, str => str.toUpperCase()); // Capitalize first letter
            setCurrentTabName(tabName);
        }
    }, [location]);

    return (
        <div >

            <Outlet />
        </div>
    );
}

export default Dashboard;
