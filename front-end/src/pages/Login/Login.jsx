import React, { useState, useEffect } from 'react';
import '../../components/styles/Login.css';
import formConfig from './formConfig';
import logo from '../../assets/logo.png';
import { getCurrentUser, loginUser } from '../../axios/api/authService';
import { toast } from 'react-toastify';
import Footer from '../../components/Headerfooter/Footer';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../redux/action';

function Login() {
    // const dispatch = useDispatch();
    const initialFormState = formConfig.reduce((acc, field) => {
        acc[field.name] = '';
        return acc;
    }, {});

    const [formData, setFormData] = useState(initialFormState);

    // const [error, setError] = useState('');

    const dispatch = useDispatch();//


    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) navigate('/dashboard');
    }, []);


    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await loginUser(formData);
            console.log('Login success:', response);
            localStorage.setItem('token', response.token); // ✅ Save token
            //   dispatch(setUserData({
            // Role: 
            //   }))
            toast.success('Login successful');


            const userResponse = await getCurrentUser();//
            dispatch(setUserData(userResponse));//

            navigate('/dashboard'); // ✅ Redirect immediately after login
        } catch (err) {
            console.error('Login error:', err.message);
            //   setError(err.message || 'Login failed.');
            toast.error(`${err.message || 'Login failed!'}`);
        }
    };



    return (
        <div>
            <div className="login-container">
                <form className="login-form" onSubmit={handleSubmit}>
                    {/* 👉 Logo goes here */}
                    <div className="logo-wrapper">
                        <img src={logo} alt="CloudBlance" className="login-logo" />
                    </div>

                    {/* {error && <p className="error">{error}</p>} */}



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

                    <button type="submit">Login</button>
                   
                </form>
               
            </div>
            <Footer />
        </div>

    )
}

export default Login
