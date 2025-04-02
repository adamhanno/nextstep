// controllers/habitHistoryController.js

const HabitHistory = require('../models/HabitHistory');
const mongoose = require('mongoose');

// Get habit history for a specific date
exports.getHabitHistory = async (req, res) => {
    const { date } = req.params;

    try {
        const history = await HabitHistory.find({
            userId: req.user._id,
            date: {
                $gte: new Date(date),
                $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1))
            }
        }).populate('habitId', 'name');  // Populate habitId with habit name

        res.json(history);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};