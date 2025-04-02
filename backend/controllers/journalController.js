// controllers/journalController.js
const Habit = require('../models/Habit');

exports.addJournalEntry = async (req, res) => {
    const { habitId, content } = req.body;

    try {
        // Find the habit to add a journal entry
        const habit = await Habit.findById(habitId);

        if (!habit) {
            return res.status(404).json({ message: 'Habit not found' });
        }

        // Push a new journal entry to the habit's journalingEntries array
        habit.journalingEntries.push({ content });
        await habit.save();

        res.status(201).json({ message: 'Journal entry added successfully', habit });
    } catch (error) {
        console.error("Error adding journal entry:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getJournalEntries = async (req, res) => {
    try {
        const habits = await Habit.find({ userId: req.user._id }).select('journalingEntries');
        
        // Map the journal entries to only include relevant information
        const journalEntries = habits.flatMap(habit =>
            habit.journalingEntries.map(entry => ({
                habitId: habit._id,
                content: entry.content,
                date: entry.date,
            }))
        );

        res.json(journalEntries);
    } catch (error) {
        console.error("Error fetching journal entries:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
