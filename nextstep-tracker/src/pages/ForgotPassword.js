import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Make sure the API URL is correct (e.g., include the correct port or use an environment variable)
            await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
            setMessage('Password reset email sent successfully!');
            // Optionally navigate to login after success
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setMessage('Error sending password reset email.');
        }
    };

    return (
        <div style={styles.container}>
            <h2>Forgot Password</h2>
            {message && <p style={styles.message}>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Reset Password</button>
            </form>
        </div>
    );
};

// Styles for the component
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'linear-gradient(to right, #6a11cb, #2575fc)',
        color: '#fff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    },
    message: {
        color: 'green',
        marginBottom: '10px',
    },
    input: {
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        fontSize: '16px',
    },
    button: {
        padding: '10px',
        borderRadius: '5px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
};

export default ForgotPassword;
