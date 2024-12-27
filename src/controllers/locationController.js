const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Location = require('../models/location');

// Get all locations
const getAllLocations = async (req, res) => {
    try {
        const locations = await Location.find().sort({ timestamp: -1 });
        if (!locations || locations.length === 0) {
            console.log('No location data found');
            return res.status(404).json({ message: 'No location data found' });
        }
        console.log('Locations retrieved successfully:', locations);
        res.status(200).json({ message: 'Locations retrieved successfully', locations });
    } catch (error) {
        console.error('Error fetching locations:', error.message);
        res.status(500).json({ message: 'Error fetching locations', error: error.message });
    }
};

// Track location
const trackLocation = async (req, res) => {
    try {
        // Validate authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            console.error('Authorization header is missing');
            return res.status(401).json({ message: 'Authorization header is missing' });
        }

        const token = authHeader.split(' ')[1];
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            console.error('Invalid or expired JWT token:', err.message);
            return res.status(401).json({ message: 'Invalid or expired token' });
        }

        const userId = decodedToken.id;

        const { latitude, longitude } = req.body;

        // Validate incoming data
        if (latitude === undefined || longitude === undefined) {
            console.error('Latitude or longitude is missing:', req.body);
            return res.status(400).json({ message: 'Missing latitude or longitude' });
        }

        // Save the location in MongoDB
        const location = new Location({
            userId,
            latitude,
            longitude,
            timestamp: new Date(),
        });

        await location.save();
        console.log('Location saved:', location);

        res.status(201).json({ message: 'Location tracked successfully', location });
    } catch (error) {
        console.error('Error tracking location:', error.message);
        res.status(500).json({ message: 'Error tracking location', error: error.message });
    }
};

// Get location logs for a specific user
const getLocationLogs = async (req, res) => {
    const { page = 1, limit = 10, startDate, endDate } = req.query;

    try {
        // Build query with optional date filtering
        const query = {};
        if (startDate && endDate) {
            query.timestamp = {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            };
        }

        // Fetch all location logs with user details
        const locations = await Location.find(query)
            .sort({ timestamp: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);
            // Populate username and email from User model

        // Total count for pagination
        const total = await Location.countDocuments(query);

        if (locations.length === 0) {
            return res.status(404).json({
                message: 'No location logs found',
                data: null,
            });
        }

        res.status(200).json({
            message: 'Location logs retrieved',
            locations,
            pagination: {
                totalLocations: total,
                currentPage: page,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error('Error fetching location logs:', error.message);
        res.status(500).json({
            message: 'Error fetching location logs',
            error: error.message,
        });
    }
};


module.exports = {
    getAllLocations,
    trackLocation,
    getLocationLogs,
};