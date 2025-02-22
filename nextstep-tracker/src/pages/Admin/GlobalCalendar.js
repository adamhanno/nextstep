import React, { useState } from 'react';
import axios from 'axios';
import './GlobalCalendar.css'; // Import the CSS file for styling

const GlobalCalendar = () => {
    const [date, setDate] = useState('');
    const [title, setTitle] = useState('');
    const [events, setEvents] = useState([]);

    // Function to create a new global event
    const createGlobalEvent = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/admin/events', { date, title }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
            setDate('');
            setTitle('');
            fetchEvents(); // Refresh the events list after creating a new event
            alert('Global event created successfully!');
        } catch (error) {
            console.error('Error creating global event:', error);
        }
    };

    // Fetch the existing global events
    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/admin/events', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    // Fetch events on component mount
    React.useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <div className="calendar-container">
            <h2>Create Global Event</h2>
            <form onSubmit={createGlobalEvent} className="event-form">
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="form-input"
                />
                <input
                    type="text"
                    placeholder="Event Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="form-input"
                />
                <button type="submit" className="submit-btn">Create Event</button>
            </form>

            <h3>Upcoming Global Events</h3>
            <table className="events-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Event Title</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event) => (
                        <tr key={event._id}>
                            <td>{event.date}</td>
                            <td>{event.title}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GlobalCalendar;
