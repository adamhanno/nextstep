import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const commonHabits = [
    { id: 1, name: 'Sleep 8 Hours', icon: '🛏️' },
    { id: 2, name: 'Reading', icon: '📚' },
    { id: 3, name: 'Playing', icon: '🎮' },
    { id: 4, name: 'Exercise', icon: '🏋️' },
    { id: 5, name: 'Meditation', icon: '🧘' },
    { id: 6, name: 'Drinking Water', icon: '💧' },
    { id: 7, name: 'Studying', icon: '📖' },
    { id: 8, name: 'Journaling', icon: '✍️' },
    { id: 9, name: 'Cooking', icon: '🍳' },
    { id: 10, name: 'Socializing', icon: '🥳' },
    { id: 11, name: 'Walking', icon: '🚶' },
    { id: 12, name: 'Time for Hobbies', icon: '🎨' },
    { id: 13, name: 'Cleaning', icon: '🧹' },
    { id: 14, name: 'Planning the Day', icon: '🗓️' },
    { id: 15, name: 'Going to Bed Early', icon: '🌙' },
];

const Onboarding = () => {
    const [wakeUpTime, setWakeUpTime] = useState('');
    const [sleepTime, setSleepTime] = useState('');
    const [selectedHabits, setSelectedHabits] = useState([]); // State to track selected habits
    const navigate = useNavigate();

    const handleCommonHabitClick = (habit) => {
        // Check if the habit is already selected
        if (selectedHabits.includes(habit.id)) {
            setSelectedHabits(selectedHabits.filter(id => id !== habit.id)); // Remove from selected
        } else {
            setSelectedHabits([...selectedHabits, habit.id]); // Add to selected
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Here you can send the user's wake-up and sleep times to your backend if necessary
        // For example:
        // await axios.post('http://localhost:5000/api/user/settings', { wakeUpTime, sleepTime });

        // Add selected habits to the user's habit list
        const token = localStorage.getItem('token');
        for (const id of selectedHabits) {
            const habit = commonHabits.find(h => h.id === id);
            await axios.post('http://localhost:5000/api/habits', {
                name: habit.name,
                frequency: 'daily', // Default frequency
                goal: 0, // Default goal
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        }

        navigate('/dashboard'); // Redirect to the dashboard after onboarding
    };

    return (
        <div className="onboarding-container">
            <h2>Onboarding</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Wake-Up Time:
                    <input type="time" value={wakeUpTime} onChange={(e) => setWakeUpTime(e.target.value)} required />
                </label>
                <label>
                    Sleep Time:
                    <input type="time" value={sleepTime} onChange={(e) => setSleepTime(e.target.value)} required />
                </label>
                <button type="submit">Continue</button>
            </form>

            <h3>Common Habits</h3>
            <div className="common-habits-container">
                {commonHabits.map((habit) => (
                    <div key={habit.id} className="habit-icon" onClick={() => handleCommonHabitClick(habit)}>
                        <span>{habit.icon}</span>
                        <p>{habit.name}</p>
                        {/* Display a checkmark if the habit is selected */}
                        {selectedHabits.includes(habit.id) && <span style={{ color: 'green', fontSize: '20px' }}> ✔️</span>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Onboarding;
