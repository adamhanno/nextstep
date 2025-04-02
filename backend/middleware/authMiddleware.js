const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");


function decryptToken(encryptedToken) {
  try {
    const parts = encryptedToken.split(":");
    const iv = Buffer.from(parts.shift(), "hex");
    const encryptedText = Buffer.from(parts.join(":"), "hex");
    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      Buffer.from(process.env.ENCRYPTION_KEY, "hex"),
      iv
    );
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  } catch (error) {
    console.log("decryptToken Error", error);
  }
}

exports.protect = async (req, res, next) => {
  let decryptedToken;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      decryptedToken = req.headers.authorization.split(" ")[1];
      //console.log("authDDDDToken", decryptedToken);
      const token = decryptToken(decryptedToken);
      //console.log("authToken", token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }
};
