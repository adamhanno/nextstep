import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Onboarding from './pages/Onboarding';
import Navbar from './components/Navbar';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import AcademicCalendar from './pages/AcademicCalendar';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import OtpVerification from './pages/OtpVerification';
import HomePage from './pages/HomePage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './services/auth';

import './App.css';

function App() {
    const location = useLocation(); // Get the current route
    const {userVerified, authState} =  useAuth()
    const navigate = useNavigate()
    useEffect(()=>{
       if (location.pathname === '/otpVerification' && userVerified && authState.token) {
         navigate("/dashboard")
       }
       if(location.pathname === '/otpVerification' && !authState.token){
        navigate("/login")
       }
    },[location])
    return (
        <>
            {/* Conditionally render Navbar */}
            {location.pathname !== '/otpVerification' && 
            <Navbar />}
            <ToastContainer />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/admin" element={
                    <ProtectedRoute adminOnly>
                        <AdminDashboard />
                    </ProtectedRoute>
                } />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                } />
                <Route path="/calendar" element={
                    <ProtectedRoute>
                        <AcademicCalendar />
                    </ProtectedRoute>
                } />
                <Route path="/contact" element={
                    <ProtectedRoute>
                        <Contact />
                    </ProtectedRoute>
                } />
                <Route path="/profile" element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                } />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
                <Route path="/otpVerification" element={<OtpVerification />} />
            </Routes>
        </>
    );
}

export default App;
