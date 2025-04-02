// middleware/isAdminMiddleware.js
const User = require('../models/User');

const isAdmin = async (req, res, next) => {
    const user = await User.findById(req.user._id);
    if (user && user.isAdmin) {
        next();
    } else {
        res.status(403).json({ message: 'Access denied, admin only' });
    }
};

module.exports = isAdmin;
