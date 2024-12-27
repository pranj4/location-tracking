const express = require('express');
const dotenv = require('dotenv');
const { connectDB, connectMongoDB } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const locationRoutes = require('./routes/locationRoutes');
const adminRoutes = require('./routes/adminRoutes');
const path = require('path');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to the databases
connectDB();          // Connect to PostgreSQL
connectMongoDB();     // Connect to MongoDB

// Middleware
app.use(express.json()); // Built-in JSON parsing middleware for Express
app.use(cors());         // Enable CORS for all origins

// Test route for health check
app.get('/', (req, res) => {
    res.send('GPS Tracking Backend is running!');
});

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/location', locationRoutes);
app.use('/api/admin', adminRoutes);

// Serve static files (like index.html, tracking.html) from public folder
app.use(express.static(path.join(__dirname, '../public')));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));