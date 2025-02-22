// pages/AdminDashboard.js
import React, { useState } from 'react';
import ManageUsers from './Admin/ManageUsers';
import GlobalCalendar from './Admin/GlobalCalendar';
import ContactMessages from './Admin/ContactMessages';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('users');

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Admin Dashboard</h1>
            <nav style={styles.nav}>
                <button
                    onClick={() => setActiveTab('users')}
                    style={{
                        ...styles.tabButton,
                        ...(activeTab === 'users' ? styles.activeTab : {}),
                    }}
                >
                    Manage Users
                </button>
                <button
                    onClick={() => setActiveTab('calendar')}
                    style={{
                        ...styles.tabButton,
                        ...(activeTab === 'calendar' ? styles.activeTab : {}),
                    }}
                >
                    Global Calendar
                </button>
                <button
                    onClick={() => setActiveTab('messages')}
                    style={{
                        ...styles.tabButton,
                        ...(activeTab === 'messages' ? styles.activeTab : {}),
                    }}
                >
                    Contact Messages
                </button>
            </nav>
            <div style={styles.content}>
                {activeTab === 'users' && <ManageUsers />}
                {activeTab === 'calendar' && <GlobalCalendar />}
                {activeTab === 'messages' && <ContactMessages />}
            </div>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f4f4f9',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
    },
    heading: {
        fontSize: '2rem',
        textAlign: 'center',
        color: '#333',
        marginBottom: '20px',
    },
    nav: {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        marginBottom: '20px',
    },
    tabButton: {
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        backgroundColor: '#e0e0e0',
        border: 'none',
        borderRadius: '5px',
        transition: 'background-color 0.3s, color 0.3s',
    },
    activeTab: {
        backgroundColor: '#6a11cb',
        color: '#fff',
    },
    content: {
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
};

export default AdminDashboard;
