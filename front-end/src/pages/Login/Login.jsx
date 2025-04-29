import React, { useState, useEffect } from 'react';
import formConfig from './formConfig';
import logo from '../../assets/logo.png';
import { getCurrentUser, loginUser } from '../../axios/api/authService';
import { toast } from 'react-toastify';
import Footer from '../../components/Headerfooter/Footer';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../redux/action';
import '../../components/styles/Login.css';

function Login() {
    const initialFormState = formConfig.reduce((acc, field) => {
        acc[field.name] = '';
        return acc;
    }, {});

    const [formData, setFormData] = useState(initialFormState);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) navigate('/dashboard');
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setLoading(true);
        try {
            const response = await loginUser(formData);
            localStorage.setItem('token', response.token);
            toast.success('Welcome To CloudBalance');

            const userResponse = await getCurrentUser();
            dispatch(setUserData(userResponse));

            navigate('/dashboard');
        } catch (err) {
            console.error('Login error:', err.message);
            toast.error(err.message || 'Login failed!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="login-container">
                <form className="login-form" onSubmit={handleSubmit}>

                    <div className="logo-wrapper">
                        <img src={logo} alt="CloudBlance" className="login-logo" />
                    </div>

                    {formConfig.map((field, index) => (
                        <div key={index}>
                            <label htmlFor={field.name}>{field.label}</label>
                            <input
                                type={field.type}
                                name={field.name}
                                id={field.name}
                                placeholder={field.placeholder}
                                value={formData[field.name]}
                                onChange={handleChange}
                                required={field.required}
                            />
                        </div>
                    ))}
                    
                    <button type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>

                </form>

            </div>
            <Footer />
        </div>

    )
}

export default Login
