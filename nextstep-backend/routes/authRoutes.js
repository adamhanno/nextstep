const express = require('express');
const { signup, login, forgotPassword, resetPassword, verifyResetToken } = require('../controllers/authController'); // Import forgotPassword
const { protect } = require('../middleware/authMiddleware');
const { sendOTPToEmail, verifyOTP } = require('../controllers/otpController');
const {validateOTP} =  require("../utills/otpService") 
const router = express.Router();

// Signup route
router.post('/signup', signup);  // Ensure this is set to POST

// Login route
router.post('/login', login);     // Ensure this is set to POST

// Route to send OTP
router.get('/send-otp', protect, sendOTPToEmail);

// Route to verify OTP
router.post('/verify-otp', protect ,validateOTP);

// Route to handle forgot password
router.post('/forgot-password', forgotPassword); // Now using the correct handler

// Route to handle password reset token verification
router.get('/reset-password/:resetToken', verifyResetToken);

// Route to handle password reset
router.post('/reset-password/:resetToken', resetPassword);

module.exports = router;
