const Habit = require('../models/Habit');
const HabitHistory = require('../models/HabitHistory');
const mongoose = require('mongoose');


// Get all habits for a user
exports.getHabits = async (req, res) => {
    try {
        const habits = await Habit.find({ userId: req.user._id });
        res.json(habits);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Store daily progress in HabitHistory and reset habit progress
const storeDailyProgressAndReset = async () => {
    const today = new Date();
    const formattedDate = new Date(today.setHours(0, 0, 0, 0)); // Start of today

    try {
        const habits = await Habit.find({});

        // Store each habit's progress for today
        for (const habit of habits) {
            const history = new HabitHistory({
                habitId: habit._id,
                userId: habit.userId,
                date: formattedDate,
                durationCompleted: habit.durationCompleted,
            });
            await history.save();

            // Reset the habit's daily progress
            habit.durationCompleted = 0;
            habit.progress = 0;
            await habit.save();
        }
        console.log("Daily habit progress saved and reset successfully.");
    } catch (error) {
        console.error("Error storing daily progress:", error);
    }
};
exports.storeDailyProgressAndReset = storeDailyProgressAndReset;

// Add a new habit
exports.addHabit = async (req, res) => {
    const { name, frequency, goal } = req.body;

    try {
        const habit = new Habit({
            userId: req.user._id,
            name,
            frequency,
            goal,
            durationCompleted: 0,
            progress: 0,
        });

        await habit.save();
        res.status(201).json(habit);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update habit progress
exports.updateHabit = async (req, res) => {
    const { durationCompleted, progress, goal, entry } = req.body;

    try {
        const habit = await Habit.findById(req.params.id);

        if (!habit) {
            return res.status(404).json({ message: 'Habit not found' });
        }

        if (habit.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        // Update fields if they are provided in the request
        if (goal !== undefined) {
            habit.goal = goal;
        }
        if (durationCompleted !== undefined) {
            habit.durationCompleted = durationCompleted;
        }
        if (progress !== undefined) {
            habit.progress = progress;
        }
        if (entry) {
            habit.journalingEntries.push({ content: entry });
        }

        await habit.save();
        res.json(habit);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Delete a habit
exports.deleteHabit = async (req, res) => {
    try {
        const habitId = req.params.id;

        // Validate the habit ID format
        if (!mongoose.Types.ObjectId.isValid(habitId)) {
            console.error(`Invalid habit ID format: ${habitId}`);
            return res.status(400).json({ message: 'Invalid habit ID format' });
        }

        // Use findByIdAndDelete to find and delete the habit
        const habit = await Habit.findByIdAndDelete({ _id: habitId, userId: req.user._id });

        if (!habit) {
            console.error(`Habit with ID ${habitId} not found or user not authorized`);
            return res.status(404).json({ message: 'Habit not found or not authorized' });
        }

        console.log(`Habit with ID ${habitId} removed successfully`);
        res.json({ message: 'Habit removed successfully' });
    } catch (error) {
        console.error('Error deleting habit:', error);
        res.status(500).json({ message: error.message });
    }
};



// Start tracking a habit
exports.startHabit = async (req, res) => {
    try {
        const habit = await Habit.findById(req.params.id);

        if (!habit) {
            return res.status(404).json({ message: 'Habit not found' });
        }

        if (habit.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        // Logic to start tracking the habit could include setting a start time or initiating tracking
        // For simplicity, no database changes needed here, the frontend will manage the timer

        res.status(200).json({ message: 'Habit tracking started' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Stop tracking a habit
exports.stopHabit = async (req, res) => {
    try {
        const habit = await Habit.findById(req.params.id);

        if (!habit) {
            return res.status(404).json({ message: 'Habit not found' });
        }

        if (habit.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        // The habit tracking is stopped by updating the progress via the updateHabit method
        // The frontend will send the accumulated time to update

        res.status(200).json({ message: 'Habit tracking stopped' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getHabitHistory = async (req, res) => {
    const { date } = req.params;
    const userId = req.user._id;

    try {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        const history = await HabitHistory.find({
            userId: userId,
            date: { $gte: startOfDay, $lte: endOfDay }
        }).populate('habitId', 'name'); // Populate habit name for easier display
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const saveJournalEntry = async (id) => {
    const token = localStorage.getItem('token');
    const entry = journalEntries[id];
    if (!entry) return;

    try {
        await axios.post(`http://localhost:5000/api/habits/journalEntries`, {
            habitId: id,
            content: entry,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // Disable editing after save
        setIsEditing({ ...isEditing, [id]: false });
    } catch (error) {
        console.error('Error saving journal entry:', error);
    }
};
