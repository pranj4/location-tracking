const express = require('express');

const { getAllLocations,trackLocation, getLocationLogs } = require('../controllers/locationController');
const isAdmin = require('../middlewares/isAdmin');

const router = express.Router();

// Route to handle location tracking (ping every 4 seconds)
router.post('/track', trackLocation);

// Route to fetch location logs for a user (admin feature)
router.get('/logs', getLocationLogs);

module.exports = router;

