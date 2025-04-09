import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GlobalCalendar.css'; // Import CSS for styling

const GlobalCalendar = () => {
    const [date, setDate] = useState('');
    const [title, setTitle] = useState('');
    const [events, setEvents] = useState([]);

    // Fetch events from API
    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/admin/events', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    // Create new event
    const createGlobalEvent = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                'http://localhost:5000/api/admin/events',
                { date, title },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            setDate('');
            setTitle('');
            fetchEvents(); // Refresh events list
            alert('Global event created successfully!');
        } catch (error) {
            console.error('Error creating global event:', error);
        }
    };

    // Fetch events on component mount
    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <div className="global-calendar">
            {/* Header Section */}
            <h2 className="calendar-title">Global Calendar</h2>

            {/* Event Creation Form */}
            <div className="event-form-container">
                <h3>Create a New Event</h3>
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
            </div>

            {/* Event List */}
            <div className="events-list">
                <h3>Upcoming Global Events</h3>
                <table className="events-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Event Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.length > 0 ? (
                            events.map((event) => (
                                <tr key={event._id}>
                                    <td>{event.date}</td>
                                    <td>{event.title}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2" className="no-events">No upcoming events</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GlobalCalendar;
