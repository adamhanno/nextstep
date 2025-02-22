import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const loginUser = async (data) => {
    const response = await axios.post(`${API_URL}/auth/login`, data);
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('isAdmin', response.data.isAdmin); // Store admin status
    return response.data.isAdmin; // Return isAdmin status for conditional navigation
};

export const signupUser = async (data) => {
    const response = await axios.post(`${API_URL}/auth/signup`, data);
    localStorage.setItem('token', response.data.token);
};

export const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin'); // Remove admin status on logout
};
