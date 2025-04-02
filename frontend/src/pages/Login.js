import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {loginUser} = useAuth()
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loadingToastId = toast.loading('Logging in...');
        try {
            const { token, isAdmin } = await loginUser({ email, password });
            if (token) {
                toast.dismiss(loadingToastId);
                toast.success('Logged in successfully!', { autoClose: 2000 });
                setTimeout(()=>{
                    navigate("/otpVerification");
                }, 1500)
            }
        } catch (err) {
            toast.error('Invalid email or password', { autoClose: 3000 });
            setError('Invalid email or password');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div style={styles.container}>
            <ToastContainer />
            <div style={styles.card}>
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

                <div style={styles.forgotPassword}>
                    <a href="/forgot-password" style={styles.link}>Forgot Password?</a>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(to right, #6a11cb, #2575fc)',
        padding: '20px',
    },
    card: {
        background: '#fff',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 5px 20px rgba(0, 0, 0, 0.2)',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center',
    },
    heading: {
        marginBottom: '20px',
        fontSize: '24px',
        color: '#333',
    },
    error: {
        color: 'red',
        marginBottom: '10px',
        fontSize: '14px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    input: {
        width: '100%',  
        padding: '15px',
        marginBottom: '15px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        fontSize: '16px',
        boxSizing: 'border-box',
    },
    passwordContainer: {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
    },
    eyeIcon: {
        position: 'absolute',
        right: '10px',
        cursor: 'pointer',
        fontSize: '18px',
        color: '#666',
    },
    button: {
        padding: '12px',
        borderRadius: '5px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.3s ease',
    },
    forgotPassword: {
        marginTop: '10px',
        fontSize: '14px',
    },
    link: {
        color: '#2575fc',
        textDecoration: 'none',
    }
};

export default Login;
