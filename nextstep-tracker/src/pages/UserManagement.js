// UserManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get('/api/admin/users');
            setUsers(response.data);
        };
        fetchUsers();
    }, []);

    const handleSuspend = async (userId, days) => {
        try {
            await axios.post(`/api/admin/users/${userId}/suspend`, { days });
            alert('User suspended successfully');
            setUsers(users.map(user => user._id === userId ? { ...user, suspended: true } : user));
        } catch (error) {
            alert('Error suspending user');
        }
    };

    const handleDelete = async (userId) => {
        try {
            await axios.delete(`/api/admin/users/${userId}`);
            alert('User deleted successfully');
            setUsers(users.filter(user => user._id !== userId));
        } catch (error) {
            alert('Error deleting user');
        }
    };

    return (
        <div>
            <h2>User Management</h2>
            <ul>
                {users.map(user => (
                    <li key={user._id}>
                        {user.username} - {user.email} 
                        {user.suspended ? " (Suspended)" : ""}
                        <button onClick={() => handleSuspend(user._id, 7)}>Suspend 7 days</button>
                        <button onClick={() => handleDelete(user._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserManagement;
