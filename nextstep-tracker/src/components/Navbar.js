import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../services/auth';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    const handleLogout = () => {
        logoutUser();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <h1><Link to="/">NextStep</Link></h1>
            <ul>
                {!token ? (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Signup</Link></li>
                    </>
                ) : isAdmin ? (
                    <>
                        <li><Link to="/admin">Admin Dashboard</Link></li>
                        <li><button onClick={handleLogout}>Logout</button></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/dashboard">Tracker</Link></li>
                        <li><Link to="/calendar">Academic Calendar</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                        <li><button onClick={handleLogout}>Logout</button></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
