import React from 'react';
import HabitTracker from '../components/HabitTracker';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <h1>Welcome to the NextStep Student Habit Tracker</h1>
            <HabitTracker />  {/* Include HabitTracker here */}
        </div>
    );
};

export default Dashboard;
