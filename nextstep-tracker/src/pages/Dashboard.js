import React, { useState, useEffect } from 'react';
import HabitTracker from '../components/HabitTracker';

const Dashboard = () => {
    const [fontSize, setFontSize] = useState('2.5rem');

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 480) {
                setFontSize('1rem'); 
            } else if (window.innerWidth <= 768) {
                setFontSize('2rem'); 
            } else {
                setFontSize('2rem'); 
            }
        };

        handleResize(); 
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div style={{ 
            textAlign: 'center', 
            padding: '20px',
            marginTop: '50px' 
            }}>
            <h1 style={{ fontSize, color: '#333', marginBottom: '20px' }}>
                Welcome to the NextStep Student Habit Tracker
            </h1>
            <HabitTracker />
        </div>
    );
};

export default Dashboard;
