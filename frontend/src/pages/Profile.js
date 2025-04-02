// Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
    const [profile, setProfile] = useState({
        username: '',
        email: '',
        phone: '',
        address: '',
        profilePicture: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [newProfilePicture, setNewProfilePicture] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:5000/api/profile', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProfile(response.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleProfilePictureChange = (e) => {
        setNewProfilePicture(e.target.files[0]);
    };

    const handleSave = async () => {
        const token = localStorage.getItem('token');
        const formData = new FormData();
        
        Object.keys(profile).forEach((key) => {
            formData.append(key, profile[key]);
        });

        if (newProfilePicture) {
            formData.append('profilePicture', newProfilePicture);
        }

        try {
            const response = await axios.put('http://localhost:5000/api/profile', formData, {
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
            });
            setProfile(response.data);
            setIsEditing(false);
            setNewProfilePicture(null);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Your Profile</h2>
            <div style={styles.profileCard}>
                <div style={styles.imageContainer}>
                    {profile.profilePicture && (
                        <img 
                            src={`http://localhost:5000/${profile.profilePicture}`} 
                            alt="Profile" 
                            style={styles.profileImage} 
                        />
                    )}
                    {isEditing && <input type="file" onChange={handleProfilePictureChange} style={styles.fileInput} />}
                </div>
                <div style={styles.field}>
                    <label style={styles.label}>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={profile.username || ''}
                        onChange={handleChange}
                        disabled={!isEditing}
                        style={isEditing ? styles.inputEdit : styles.input}
                    />
                </div>
                <div style={styles.field}>
                    <label style={styles.label}>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={profile.email || ''}
                        onChange={handleChange}
                        disabled={!isEditing}
                        style={isEditing ? styles.inputEdit : styles.input}
                    />
                </div>
                <div style={styles.field}>
                    <label style={styles.label}>Phone:</label>
                    <input
                        type="tel"
                        name="phone"
                        value={profile.phone || ''}
                        onChange={handleChange}
                        disabled={!isEditing}
                        style={isEditing ? styles.inputEdit : styles.input}
                    />
                </div>
                <div style={styles.field}>
                    <label style={styles.label}>Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={profile.address || ''}
                        onChange={handleChange}
                        disabled={!isEditing}
                        style={isEditing ? styles.inputEdit : styles.input}
                    />
                </div>
                <div style={styles.buttonContainer}>
                    {isEditing ? (
                        <button onClick={handleSave} style={styles.saveButton}>Save</button>
                    ) : (
                        <button onClick={() => setIsEditing(true)} style={styles.editButton}>Edit</button>
                    )}
                </div>
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
        minHeight: '100vh',
        background: 'linear-gradient(to right, #1d2671, #c33764)',
        color: '#fff',
        fontFamily: 'Arial, sans-serif',
        padding: '40px 20px',
    },
    heading: {
        fontSize: '2.5rem',
        color: '#fff',
        marginBottom: '30px',
        textAlign: 'center',
    },
    profileCard: {
        backgroundColor: '#fff',
        borderRadius: '12px',
        padding: '30px',
        width: '90%', 
        maxWidth: '600px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    imageContainer: {
        marginBottom: '30px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    profileImage: {
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        objectFit: 'cover',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
    },
    fileInput: {
        marginTop: '15px',
    },
    field: {
        width: '100%',
        marginBottom: '20px',
    },
    label: {
        display: 'block',
        fontWeight: 'bold',
        marginBottom: '8px',
        color: '#444',
    },
    input: {
        width: '100%', 
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid #ccc',
        fontSize: '1rem',
        backgroundColor: '#f8f9fa',
        color: '#333',
        boxSizing: 'border-box',
    },
    inputEdit: {
        width: '100%', 
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid #333',
        fontSize: '1rem',
        color: '#333',
        boxSizing: 'border-box',
    },
    buttonContainer: {
        marginTop: '25px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    editButton: {
        padding: '12px 30px',
        borderRadius: '8px',
        backgroundColor: '#ff5c5c',
        color: '#fff',
        border: 'none',
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        marginRight: '10px',
        minWidth: '120px', 
    },
    saveButton: {
        padding: '12px 30px',
        borderRadius: '8px',
        backgroundColor: '#4CAF50',
        color: '#fff',
        border: 'none',
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        minWidth: '120px', 
    },
};



export default Profile;
