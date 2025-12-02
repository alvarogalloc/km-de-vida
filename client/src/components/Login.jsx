import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useUser } from '../context/UserContext';

const Login = () => {
    const { login } = useUser();

    const handleSuccess = async (credentialResponse) => {
        try {
            const res = await axios.post(import.meta.env.VITE_BACKEND_HOST+'/api/auth/google', {
                token: credentialResponse.credential,
            });
            console.log('Login Success:', res.data);
            login(res.data.user);
        } catch (error) {
            console.error('Login Failed:', error);
            alert('Login failed. Please try again.');
        }
    };

    const handleError = () => {
        console.log('Login Failed');
    };

    return (
        <div className="flex justify-center items-center">
            <GoogleLogin
                onSuccess={handleSuccess}
                onError={handleError}
                type="icon"
                shape="circle"
            />
        </div>
    );
};

export default Login;
