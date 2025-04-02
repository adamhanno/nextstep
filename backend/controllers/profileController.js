// controllers/profileController.js

const User = require('../models/User');

// Get profile data
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profile' });
    }
};

// Update profile data
exports.updateProfile = async (req, res) => {
    try {
        const updates = {
            username: req.body.username,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
        };

        // If a profile picture was uploaded, update its path
        if (req.file) {
            updates.profilePicture = req.file.path;
        }

        const updatedUser = await User.findByIdAndUpdate(req.user._id, updates, { new: true });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile' });
    }
};
