const { generateOTP, sendOTP } = require("../utills/otpService");
const User = require("../models/User");

// Send OTP to Email
exports.sendOTPToEmail = async (req, res) => {
  const findUser = req.user;

  try {
    let user = await User.findOne({ _id: findUser._id });
    console.log("DB User", user);

    //console.log(user.OTP, user.OTPExpiry);

    if (!user) {
      return res
        .status(404)
        .json({ valid: false, message: "OTP user not found." });
    }

    
    const OTP = generateOTP();
    if (!OTP) {
      return res.json({ message: "Enable to Generate OTP for Signup" });
    }
    const OTPExpiry = Date.now() + 5 * 60 * 1000;
    if (!OTPExpiry) {
      return res.json({ message: "Enable to Set OTP Expiry" });
    }

    if (user) {
      await sendOTP(user.email, OTP);
    }

    await User.updateOne(
      { _id: user._id },
      { $set: { OTP: OTP, OTPExpiry: OTPExpiry, userVerified: false } }
    );

    user = await User.findOne({ _id: user._id });

    return res.status(200).json({
      message: "OTP resend successfully.",
    });
  } catch (error) {
    console.error("Error Resending OTP:", error);
    return res
      .status(500)
      .json({ valid: false, message: "Internal server error." });
  }
};
