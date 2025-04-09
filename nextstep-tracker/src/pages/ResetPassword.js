// ResetPassword.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const { resetToken } = useParams(); // Get the reset token from the URL
    const navigate = useNavigate();

    useEffect(() => {
        // Validate the reset token
        axios
            .get(`/api/auth/reset-password/${resetToken}`)
            .then((response) => {
                console.log(response.data);
                setError(''); // Clear error if token is valid
            })
            .catch((error) => {
                if (!message) { // Only set error if there's no success message
                    setError('Invalid or expired reset token');
                }
            });
    }, [resetToken, message]); // Dependency on message ensures it won't run if there's a success message
    

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
    
        try {
            await axios.post(`http://localhost:5000/api/auth/reset-password/${resetToken}`, { password });
            setMessage('Password updated successfully!');
            setError(''); // Clear any residual error
            setTimeout(() => navigate('/login'), 2000); // Redirect to login after success
        } catch (error) {
            setError('Failed to update password');
        }
    };
    

    return (
        <div style={styles.container}>
            <h2>Reset Password</h2>
            {message && <p style={styles.message}>{message}</p>}
            {error && <p style={styles.error}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={styles.input}
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>
                    Reset Password
                </button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '90vh',
        background: 'linear-gradient(to right, #6a11cb, #2575fc)',
        color: '#fff',
        padding: '20px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        width: '100%',
        margin: '0 auto',
    },
    message: {
        color: 'green',
        marginBottom: '10px',
    },
    error: {
        color: 'red',
        marginBottom: '10px',
    },
    input: {
        padding: '12px',
        marginBottom: '12px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        fontSize: '16px',
        width: '95%',
    },
    button: {
        padding: '12px',
        borderRadius: '5px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        width: '100%',
    },
    '@media (max-width: 600px)': {
        container: {
            padding: '15px',
        },
        input: {
            fontSize: '14px',
        },
        button: {
            padding: '12px',
        },
    },
};

export default ResetPassword;
