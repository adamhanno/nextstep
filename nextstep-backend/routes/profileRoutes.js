// routes/profileRoutes.js
const express = require('express');
const { getProfile, updateProfile } = require('../controllers/profileController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

// Route to get profile data
router.get('/', protect, getProfile);

// Route to update profile data with file upload
router.put('/', protect, upload.single('profilePicture'), updateProfile);

module.exports = router;
