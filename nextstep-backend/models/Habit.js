const mongoose = require('mongoose');

const HabitSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    frequency: { type: String, enum: ['daily', 'weekly', 'monthly'], required: true },
    goal: { type: Number, required: true },  // Total time goal for the habit in minutes
    durationCompleted: { type: Number, default: 0 }, // Time spent so far in minutes
    progress: { type: Number, default: 0 }, // Percentage completion (0-100%)
    streak: { type: Number, default: 0 }, // Number of consecutive days the habit was completed
    journalingEntries: [{
        date: { type: Date, default: Date.now },
        content: { type: String, required: true },
    }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }, // Added to track last update/reset
});

module.exports = mongoose.model('Habit', HabitSchema);