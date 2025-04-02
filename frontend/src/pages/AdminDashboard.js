import React, { useState } from 'react';
import ManageUsers from './Admin/ManageUsers';
import GlobalCalendar from './Admin/GlobalCalendar';
import ContactMessages from './Admin/ContactMessages';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('users');

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-heading">Admin Dashboard</h1>
            
            {/* Navigation Menu */}
            <nav className="dashboard-nav">
                <div className="tab-buttons">
                    <button 
                        onClick={() => setActiveTab('users')} 
                        className={`tab-button ${activeTab === 'users' ? 'active' : ''}`}
                        aria-label="Manage Users"
                    >
                        Manage Users
                    </button>
                    <button 
                        onClick={() => setActiveTab('calendar')} 
                        className={`tab-button ${activeTab === 'calendar' ? 'active' : ''}`}
                        aria-label="Global Calendar"
                    >
                        Global Calendar
                    </button>
                    <button 
                        onClick={() => setActiveTab('messages')} 
                        className={`tab-button ${activeTab === 'messages' ? 'active' : ''}`}
                        aria-label="Contact Messages"
                    >
                        Contact Messages
                    </button>
                </div>
            </nav>

            {/* Content Section */}
            <div className="dashboard-content">
                {activeTab === 'users' && <ManageUsers />}
                {activeTab === 'calendar' && <GlobalCalendar />}
                {activeTab === 'messages' && <ContactMessages />}
            </div>
        </div>
    );
};

export default AdminDashboard;
