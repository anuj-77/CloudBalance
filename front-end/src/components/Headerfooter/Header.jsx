import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import user from '../../assets/user.png'
import logout from '../../assets/logout.png';
import '../styles/Header.css';
import { logoutUser, getCurrentUser } from '../../axios/api/authService';
import { toast } from 'react-toastify';


function Header() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getCurrentUser();
                setUserName(`${response.firstName} ${response.lastName}`);
            } catch (error) {
                console.error('Failed to fetch user:', error);
            }
        };

        fetchUser();
    }, []);

    const handleLogout = async () => {
        try {

            await logoutUser();


            localStorage.removeItem('token');
            localStorage.removeItem('persist:root'); // If using redux-persist


            navigate('/');


            toast.success('Logged out successfully!');
        } catch (err) {
            console.error('Logout failed:', err);
            toast.error('Logout failed! Please try again.');
        }
    };


    return (
        <header className="header-container">
            <div className="logo-wrapper">
                <img src={logo} alt="CloudBalance Logo" className="logo-img" />
            </div>

            <div className="logout-wrapper">

                <div className="welcome-wrapper">
                    <img src={user} alt="Accoount" className="account-logo" />

                    {userName && <span className="welcome-message"><div>Welcome</div> {userName}</span>}
                </div>

                <button className="logout-button" onClick={handleLogout}>
                    <img src={logout} alt="Logout" className="logout-icon" />
                    Logout
                </button>

            </div>
        </header>
    )
}

export default Header;
