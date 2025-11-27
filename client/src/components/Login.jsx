import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const Login = () => {
    const handleSuccess = async (credentialResponse) => {
        try {
            const res = await axios.post('http://localhost:5173/api/auth/google', {
                token: credentialResponse.credential,
            });
            console.log('Login Success:', res.data);
            alert(`Welcome ${res.data.user.name}!`);
        } catch (error) {
            console.error('Login Failed:', error);
            alert('Login failed. Please try again.');
        }
    };

    const handleError = () => {
        console.log('Login Failed');
    };

    return (
        <div className="flex justify-center items-center p-4">
            <GoogleLogin
                onSuccess={handleSuccess}
                onError={handleError}
                useOneTap
            />
        </div>
    );
};

export default Login;
