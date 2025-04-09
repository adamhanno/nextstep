// controllers/contactController.js
const Contact = require('../models/ContactMessage');

exports.sendContactMessage = async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const contactMessage = new Contact({ name, email, message });
        await contactMessage.save();
        res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving message' });
    }
};

exports.getAllMessages = async (req, res) => {
    try {
        const messages = await Contact.find();
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving messages' });
    }
};