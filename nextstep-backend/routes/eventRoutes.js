// routes/eventRoutes.js
const express = require('express');
const { getEventsByDate, addEvent, markEventCompleted, deleteEvent } = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Routes for events
router.get('/:date', protect, getEventsByDate); // Get events for a specific date
router.post('/', protect, addEvent); // Add a new event
router.put('/:id/complete', protect, markEventCompleted); // Mark an event as completed
router.delete('/:id', protect, deleteEvent); // Delete an event

module.exports = router;
