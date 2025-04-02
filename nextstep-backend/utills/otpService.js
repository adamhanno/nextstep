const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/User');


function generateOTP() {
    return crypto.randomInt(100000, 999999).toString();
}

async function sendOTP(email, otp) {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
        tls: {
            rejectUnauthorized: false,
        }
    });

    const mailOptions = {
        from: `Habit Tracker <${process.env.EMAIL}>`,
        to: email,
        subject: 'OTP for Verification',
        html: `<p>Your OTP is: <strong>${otp}</strong></p>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`OTP sent to ${email}`);
    } catch (error) {
        console.error('Error sending OTP:', error);
        throw new Error('Failed to send OTP');
    }
}

async function validateOTP(req ,res) {
    
    //const finduser = await req.user;
    
    const {OTP} = req.body
    console.log(OTP)
    

    try {
    
        let user = await User.findOne({OTP});
        console.log("DB User", user);
        
       //console.log(user.OTP, user.OTPExpiry);

       if (!user) {
        return res.status(404).json({ valid: false, message: 'OTP user not found.' });
       }
       

        if (!user.OTP == null) {
            return res.status(404).json({ valid: false, message: 'OTP not found or expired.' });
        }

        
        if ((user.OTPExpiry < Date.now()) || user.OTPExpiry == null) {
        
            await User.updateOne({ _id: user._id }, { $set: { OTP: null, OTPExpiry: null } });
            return res.status(400).json({ valid: false, message: 'OTP expired. Please request a new one.' });
        }

        
          await User.updateOne({ _id: user._id }, { $set: { OTP: null, OTPExpiry: null, userVerified: true } });

          user = await User.findOne({_id: user._id})

        return res.status(200).json({ valid: true, message: 'OTP verified successfully.', userVerified: user.userVerified });
    } catch (error) {
        console.error('Error verifying OTP:', error);
        return res.status(500).json({ valid: false, message: 'Internal server error.' });
    }
}



module.exports = {
    generateOTP,
    sendOTP,
    validateOTP,
};
