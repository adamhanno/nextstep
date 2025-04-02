// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    phone: { type: String },
    address: { type: String },
    profilePicture: { type: String },
    resetToken: { type: String },
    resetTokenExpiration: { type: Date }, // Store path to profile picture
    userVerified: { type: Boolean, default: false }, // New field for verification status
    OTP: { type: String, unique: true }, // Field to store OTP
    OTPExpiry: { type: Date }, // Field to store OTP expiration time
});

// Encrypt the password before saving the user
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
