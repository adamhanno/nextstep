// Contact.js
import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/contact', formData);
            setStatus('Message sent successfully!');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            setStatus('Failed to send message. Try again later.');
        }
    };

    return (
        <div style={contactStyles.container}>
            <h2 style={contactStyles.heading}>Contact Us</h2>
            <p style={contactStyles.description}>Have any questions? Feel free to reach out to us!</p>
            <form onSubmit={handleSubmit} style={contactStyles.form}>
                <label style={contactStyles.label}>
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required style={contactStyles.input} />
                </label>
                <label style={contactStyles.label}>
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required style={contactStyles.input} />
                </label>
                <label style={contactStyles.label}>
                    Message:
                    <textarea name="message" value={formData.message} onChange={handleChange} required style={contactStyles.textarea}></textarea>
                </label>
                <button type="submit" style={contactStyles.button}>Send Message</button>
            </form>
            {status && <p style={contactStyles.status}>{status}</p>}
        </div>
    );
};

const contactStyles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(to right, #ff7e5f, #feb47b)',
        color: '#fff',
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
    },
    heading: {
        fontSize: '3rem',
        marginBottom: '20px',
        fontWeight: 'bold',
    },
    description: {
        fontSize: '1.2rem',
        marginBottom: '40px',
        textAlign: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '500px',
        background: '#fff',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    },
    label: {
        width: '100%',
        marginBottom: '15px',
        fontWeight: 'bold',
        color: '#333',
    },
    input: {
        width: '100%',
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        fontSize: '1rem',
        marginTop: '8px',
        backgroundColor: '#f9f9f9',
    },
    textarea: {
        width: '100%',
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        fontSize: '1rem',
        marginTop: '8px',
        backgroundColor: '#f9f9f9',
        minHeight: '100px',
    },
    button: {
        width: '100%',
        padding: '12px',
        borderRadius: '8px',
        backgroundColor: '#ff7e5f',
        color: '#fff',
        border: 'none',
        fontSize: '1.2rem',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    buttonHover: {
        backgroundColor: '#feb47b',
    },
    status: {
        marginTop: '20px',
        fontSize: '1.2rem',
        color: '#28a745',
    }
};

export default Contact;

