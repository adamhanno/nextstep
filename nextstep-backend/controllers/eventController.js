// controllers/eventController.js

const Event = require('../models/Event');
const mongoose = require('mongoose');

// Get events for a specific date
exports.getEventsByDate = async (req, res) => {
    const { date } = req.params;
    console.log('Fetching events for date:', date);  // Log the incoming date parameter

    try {
        const startOfDay = new Date(date);
        startOfDay.setUTCHours(0, 0, 0, 0);  
        const endOfDay = new Date(date);
        endOfDay.setUTCHours(23, 59, 59, 999);  

        console.log('Start of day:', startOfDay);
        console.log('End of day:', endOfDay);

        const events = await Event.find({
            userId: req.user._id,
            date: { $gte: startOfDay, $lte: endOfDay }
        });

        console.log('Fetched events:', events);  // Log fetched events for verification
        res.json(events);
    } catch (error) {
        console.error('Error fetching events:', error);  // Log any errors encountered
        res.status(500).json({ message: error.message });
    }
};

// Add a new event
exports.addEvent = async (req, res) => {
    const { date, title } = req.body;

    try {
        const event = new Event({
            userId: req.user._id,
            date,
            title,
        });

        await event.save();
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mark an event as completed
exports.markEventCompleted = async (req, res) => {
    const { id } = req.params;

    try {
        const event = await Event.findOneAndUpdate(
            { _id: id, userId: req.user._id },
            { completed: true },
            { new: true }
        );

        if (!event) {
            return res.status(404).json({ message: 'Event not found or not authorized' });
        }

        res.json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an event
exports.deleteEvent = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid event ID' });
        }

        const event = await Event.findOneAndDelete({ _id: id, userId: req.user._id });

        if (!event) {
            return res.status(404).json({ message: 'Event not found or not authorized' });
        }

        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
