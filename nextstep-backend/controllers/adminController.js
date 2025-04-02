// controllers/adminController.js
const User = require('../models/User');
const Event = require('../models/Event');
const ContactMessage = require('../models/ContactMessage');
const HabitHistory = require('../models/HabitHistory');

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        await User.findByIdAndDelete(userId);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user' });
    }
};

// Get all contact messages
exports.getContactMessages = async (req, res) => {
    try {
        const messages = await ContactMessage.find().sort({ date: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching contact messages' });
    }
};

// Create a global event for all users
exports.createGlobalEvent = async (req, res) => {
    try {
        const { date, title } = req.body;
        const event = new Event({ date, title, isGlobal: true });
        await event.save();

        // Optionally create individual events for each user
        const users = await User.find();
        for (const user of users) {
            await new Event({ userId: user._id, date, title }).save();
        }

        res.status(201).json({ message: 'Global event created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating global event' });
    }
};
