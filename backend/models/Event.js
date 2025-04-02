// models/Event.js
const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }, // No user ID for global events
    date: { type: Date, required: true },
    title: { type: String, required: true },
    completed: { type: Boolean, default: false }, // Track event completion status
    isGlobal: { type: Boolean, default: false }, // Indicate if event is global
});

module.exports = mongoose.model('Event', EventSchema);
