// routes/adminRoutes.js
const express = require('express');
const { getAllUsers, getLocationLogs } = require('../controllers/adminController');

const router = express.Router();

// Route to fetch all users
router.get('/users', getAllUsers);

// Route to fetch location logs for a specific user
router.get('/logs', getLocationLogs);

module.exports = router;
