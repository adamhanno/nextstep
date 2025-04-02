import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../services/auth';

const ProtectedRoute = ({ children }) => {
    const {userVerified} = useAuth()
    const token = localStorage.getItem('token');

    if (token && userVerified) {
        return children;
    }

    return <Navigate to="/login" />;
};

export default ProtectedRoute;
