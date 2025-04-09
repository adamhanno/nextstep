// server.js
const express = require('express');
const mongoose = require('mongoose');
const helmet = require ("helmet");
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const habitRoutes = require('./routes/habitRoutes');
const eventRoutes = require('./routes/eventRoutes');
const cron = require('node-cron');
const { storeDailyProgressAndReset } = require('./controllers/habitController');
const profileRoutes = require('./routes/profileRoutes');
const path = require('path');
const adminRoutes = require('./routes/adminRoutes');
const contactRoutes = require('./routes/contactRoutes');


dotenv.config();

const app = express();
const corsOptions = {
    origin: process.env.FRONTEND_URL, 
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
// Helmet configuration for enhanced security
app.use(
    helmet({
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "default-src": ["'self'"],
          "script-src": ["'self'", "'unsafe-inline'"],
          "style-src": ["'self'", "https:", "'unsafe-inline'"], 
          "img-src": ["'self'", "data:", "https:"],
          "connect-src": ["'self'", "https:"], 
          "font-src": ["'self'", "https:"], 
          "frame-ancestors": ["'self'"], 
        },
      },
      crossOriginEmbedderPolicy: true,
      referrerPolicy: { policy: "no-referrer" }, 
      hsts: {
        maxAge: 31536000, 
        includeSubDomains: true,
        preload: true,
      },
      frameguard: { action: "sameorigin" }, 
      noSniff: true, 
      xssFilter: true, 
    })
  );
  app.use(express.json({limit: "16kb"}))
  app.use(express.urlencoded({extended:true, limit:"16kb"}))
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api/habits', habitRoutes);  // This should expose the /habitHistory route under /api/habits
app.use('/api/events', eventRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);

// Schedule a cron job to run every day at 11:59 PM
cron.schedule('59 23 * * *', async () => {
    console.log("Running daily habit reset job");
    await storeDailyProgressAndReset();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
