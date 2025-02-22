// routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage');

// Save contact message
router.post('/', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const newMessage = new ContactMessage({ name, email, message });
        await newMessage.save();
        res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error saving contact message:', error);
        res.status(500).json({ message: 'Failed to send message' });
    }
});

module.exports = router;
