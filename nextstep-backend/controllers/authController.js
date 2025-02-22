// authController.js

const nodemailer = require('nodemailer');
const crypto = require('crypto');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate a JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Signup user
exports.signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({ username, email, password });

        return res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login user
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            const token = generateToken(user._id);

            // Return user data along with the token and isAdmin field
            return res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin,  // Send the isAdmin flag
                token,
            });
        } else {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Forgot password
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate a reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetToken = resetToken;
        user.resetTokenExpiration = Date.now() + 3600000; // 1 hour expiry
        await user.save();

        // Send reset email using nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL, // your email
                pass: process.env.PASSWORD, // your email password
            },
        });

        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
        
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Password Reset',
            html: `<p>You requested a password reset. Click the link below to reset your password:</p>
                   <a href="${resetUrl}" target="_blank">Reset Password</a>
                   <p>If you did not request a password reset, please ignore this email.</p>`
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return res.status(500).json({ message: 'Failed to send email' });
            }
            res.status(200).json({ message: 'Password reset email sent successfully' });
        });

    } catch (error) {
        res.status(500).json({ message: 'Failed to send reset email' });
    }
};



// Verify Reset Token
exports.verifyResetToken = async (req, res) => {
    const { resetToken } = req.params;

    try {
        const user = await User.findOne({ resetToken, resetTokenExpiration: { $gt: Date.now() } });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired reset token' });
        }

        res.status(200).json({ message: 'Token is valid' });
    } catch (error) {
        res.status(500).json({ message: 'Error verifying reset token' });
    }
};

// Reset Password
exports.resetPassword = async (req, res) => {
    const { resetToken } = req.params;
    const { password } = req.body;

    try {
        const user = await User.findOne({ resetToken, resetTokenExpiration: { $gt: Date.now() } });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired reset token' });
        }

        // Update password and clear reset token
        user.password = password;
        user.resetToken = undefined;
        user.resetTokenExpiration = undefined;
        await user.save();

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error resetting password' });
    }
};
