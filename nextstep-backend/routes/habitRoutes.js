const express = require('express');
const { getHabits, addHabit, updateHabit, deleteHabit, startHabit, stopHabit } = require('../controllers/habitController');
const { addJournalEntry, getJournalEntries } = require('../controllers/journalController');
const { getHabitHistory } = require('../controllers/habitHistoryController'); // Import the new controller
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Get all habits for a user
router.get('/', protect, getHabits);

// Add a new habit
router.post('/', protect, addHabit);

// Update a habit's progress or goal
router.put('/:id', protect, updateHabit);

// Delete a habit
router.delete('/:id', protect, deleteHabit);

// Start tracking a habit
router.post('/:id/start', protect, startHabit);

// Stop tracking a habit
router.post('/:id/stop', protect, stopHabit);

// Get habit history for a specific date
router.get('/habitHistory/:date', protect, getHabitHistory); // New route for habit history

router.get('/journalEntries', protect, getJournalEntries);

router.post('/journalEntries', protect, addJournalEntry);

module.exports = router;
