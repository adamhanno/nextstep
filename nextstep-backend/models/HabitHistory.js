// models/HabitHistory.js
const mongoose = require('mongoose');

const HabitHistorySchema = new mongoose.Schema({
    habitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Habit', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now },
    durationCompleted: { type: Number, required: true } // Duration in minutes
});

module.exports = mongoose.model('HabitHistory', HabitHistorySchema);
