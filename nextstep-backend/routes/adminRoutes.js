// routes/adminRoutes.js
const express = require('express');
const { getAllUsers, deleteUser, getContactMessages, createGlobalEvent } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdminMiddleware');

const router = express.Router();

// Admin can get all users
router.get('/users', protect, isAdmin, getAllUsers);

// Admin can delete a user
router.delete('/users/:userId', protect, isAdmin, deleteUser);

// Admin can view all contact messages
router.get('/contact', protect, isAdmin, getContactMessages);

// Admin can create a global event for all users
router.post('/events', protect, isAdmin, createGlobalEvent);

module.exports = router;
