import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../services/auth';

import "./Navbar.css";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const {logoutUser} = useAuth()
    const token = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    const handleLogout = () => {
        logoutUser();
        navigate('/login');
        setMenuOpen(false);  // ✅ Close the menu after logout
    };

    return (
        <nav className="navbar">
            <h1><Link to="/">NextStep</Link></h1>

            
            <div className={`menu-toggle ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>

            {/* Navigation Links */}
            <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
                {!token ? (
                    <>
                        <li><Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link></li>
                        <li><Link to="/signup" onClick={() => setMenuOpen(false)}>Signup</Link></li>
                    </>
                ) : isAdmin ? (
                    <>
                        <li><Link to="/admin" onClick={() => setMenuOpen(false)}>Admin Dashboard</Link></li>
                        <li><button onClick={handleLogout}>Logout</button></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/dashboard" onClick={() => setMenuOpen(false)}>Tracker</Link></li>
                        <li><Link to="/calendar" onClick={() => setMenuOpen(false)}>Academic Calendar</Link></li>
                        <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
                        <li><Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link></li>
                        <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
