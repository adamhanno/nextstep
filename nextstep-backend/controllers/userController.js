// controllers/userController.js
const User = require('../models/User');
const Habit = require('../models/Habit');

// Get all users (Admin)
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Don't return passwords
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a user (Admin)
exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Delete related habits if needed
        await Habit.deleteMany({ userId: id });

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get contact messages (Admin)
exports.getContactMessages = async (req, res) => {
    try {
        const messages = await Message.find(); // Assuming you have a Message model
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
