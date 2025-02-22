import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './AcademicCalendar.css';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const AcademicCalendar = () => {
    const [date, setDate] = useState(new Date());
    const [habitHistory, setHabitHistory] = useState([]);
    const [events, setEvents] = useState([]);
    const [eventTitle, setEventTitle] = useState('');

    useEffect(() => {
        const fetchHabitHistoryAndEvents = async () => {
            const token = localStorage.getItem('token');
            const formattedDate = date.toISOString().split('T')[0];

            try {
                const habitHistoryResponse = await axios.get(`http://localhost:5000/api/habits/habitHistory/${formattedDate}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setHabitHistory(habitHistoryResponse.data);

                const eventsResponse = await axios.get(`http://localhost:5000/api/events/${formattedDate}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setEvents(eventsResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchHabitHistoryAndEvents();
    }, [date]);

    const handleDateChange = (selectedDate) => {
        setDate(selectedDate);
    };

    const addEvent = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const formattedDate = date.toISOString().split('T')[0];

        try {
            const response = await axios.post(`http://localhost:5000/api/events`, {
                date: formattedDate,
                title: eventTitle,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEvents([...events, response.data]);
            setEventTitle('');
        } catch (error) {
            console.error('Error adding event:', error);
        }
    };

    const markEventCompleted = async (eventId) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.put(`http://localhost:5000/api/events/${eventId}/complete`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEvents(events.map(event => event._id === eventId ? response.data : event));
        } catch (error) {
            console.error('Error marking event as completed:', error);
        }
    };

    const deleteEvent = async (eventId) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:5000/api/events/${eventId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEvents(events.filter(event => event._id !== eventId));
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    const habitChartData = {
        labels: habitHistory.map((history) => history.habitId?.name || 'Unknown Habit'),
        datasets: [
            {
                label: 'Minutes Completed',
                data: habitHistory.map((history) => history.durationCompleted),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="academic-calendar-container">
            <h2>Academic Calendar</h2>
            <Calendar onChange={handleDateChange} value={date} />
            <div className="habit-history">
                <h3>Habit History for {date.toDateString()}</h3>
                {habitHistory.length ? (
                    <Bar data={habitChartData} />
                ) : (
                    <p>No habits recorded for this date.</p>
                )}
            </div>
            <form onSubmit={addEvent}>
                <input
                    type="text"
                    placeholder="Event Title"
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    required
                />
                <button type="submit" className="dynamic-button">Add Event</button>
            </form>
            <div className="event-table-container">
                <h3>Events on {date.toDateString()}</h3>
                {events.length > 0 ? (
                    <table className="event-table">
                        <colgroup>
                            <col style={{ width: "10%" }} /> {/* Numbers column */}
                            <col style={{ width: "70%" }} /> {/* Event title column */}
                            <col style={{ width: "20%" }} /> {/* Actions column */}
                        </colgroup>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Event</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map((event, index) => (
                                <tr key={event._id} className={event.completed ? 'completed-event' : ''}>
                                    <td>{index + 1}</td>
                                    <td>{event.title}</td>
                                    <td>
                                        <button
                                            onClick={() => markEventCompleted(event._id)}
                                            disabled={event.completed}
                                            className="dynamic-button"
                                        >
                                            {event.completed ? 'Completed' : 'Mark Completed'}
                                        </button>
                                        <button
                                            onClick={() => deleteEvent(event._id)}
                                            className="dynamic-button"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No events found for this date.</p>
                )}
            </div>
        </div>
    );
};

export default AcademicCalendar;
