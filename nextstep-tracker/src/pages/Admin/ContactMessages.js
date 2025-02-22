import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ContactMessages.css'; // Import the CSS file for styling

const ContactMessages = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/admin/contact', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching contact messages:', error);
        }
    };

    return (
        <div className="contact-messages-container">
            <h2>Contact Messages</h2>
            <table className="messages-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Message</th>
                    </tr>
                </thead>
                <tbody>
                    {messages.map((msg) => (
                        <tr key={msg._id}>
                            <td>{msg.name}</td>
                            <td>{msg.email}</td>
                            <td>{msg.message}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ContactMessages;
