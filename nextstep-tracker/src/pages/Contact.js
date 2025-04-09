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
        <div style={styles.container}>
            <h2 style={styles.heading}>Contact Us</h2>
            <p style={styles.description}>Have any questions? Feel free to reach out to us!</p>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required style={styles.input} />
                </div>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required style={styles.input} />
                </div>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Message:</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} required style={styles.textarea}></textarea>
                </div>
                <button type="submit" style={styles.button}>Send Message</button>
            </form>
            {status && <p style={styles.status}>{status}</p>}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(to right, #ff7e5f, #feb47b)',
        color: '#fff',
        fontFamily: 'Arial, sans-serif',
        padding: '0px 35px 0px 35px',
    },
    heading: {
        fontSize: '2.5rem',
        marginBottom: '15px',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    description: {
        fontSize: '1.2rem',
        marginBottom: '30px',
        textAlign: 'center',
        maxWidth: '500px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '500px',
        background: '#fff',
        padding: '25px',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    },
    inputGroup: {
        width: '100%',
        marginBottom: '15px',
    },
    label: {
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '5px',
        display: 'block',
    },
    input: {
        width: '100%',
        padding: '12px',
        borderRadius: '6px',
        border: '1px solid #ddd',
        fontSize: '1rem',
        backgroundColor: '#f9f9f9',
        outline: 'none',
        boxSizing: 'border-box',
    },
    textarea: {
        width: '100%',
        padding: '12px',
        borderRadius: '6px',
        border: '1px solid #ddd',
        fontSize: '1rem',
        backgroundColor: '#f9f9f9',
        minHeight: '120px',
        outline: 'none',
        boxSizing: 'border-box',
    },
    button: {
        width: '100%',
        padding: '12px',
        borderRadius: '6px',
        backgroundColor: '#ff7e5f',
        color: '#fff',
        border: 'none',
        fontSize: '1.2rem',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    status: {
        marginTop: '15px',
        fontSize: '1rem',
        color: '#28a745',
        fontWeight: 'bold',
    }
};

export default Contact;
