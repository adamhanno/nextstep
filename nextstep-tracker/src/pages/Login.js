// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const isAdmin = await loginUser({ email, password });
            if (isAdmin) {
                navigate('/admin'); // Navigate to admin dashboard
            } else {
                navigate('/dashboard'); // Navigate to regular user dashboard
            }
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Login</h2>
            {error && <p style={styles.error}>{error}</p>}
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={styles.input}
                />
                <div style={styles.passwordContainer}>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <span onClick={togglePasswordVisibility} style={styles.eyeIcon}>
                        {showPassword ? '👁️' : '🙈'}
                    </span>
                </div>
                <button type="submit" style={styles.button}>Login</button>
            </form>

            {/* Forgot Password Link */}
            <div style={styles.forgotPassword}>
                <a href="/forgot-password">Forgot Password?</a>
            </div>
        </div>
    );
};

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
    heading: {
        marginBottom: '20px',
    },
    error: {
        color: 'red',
        marginBottom: '10px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '400px',
    },
    input: {
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        fontSize: '16px',
    },
    passwordContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    eyeIcon: {
        cursor: 'pointer',
        marginLeft: '10px',
        fontSize: '20px',
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
    forgotPassword: {
        marginTop: '10px',
        fontSize: '14px',
    },
};

export default Login;
