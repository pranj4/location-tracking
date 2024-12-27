// controllers/adminController.js
// Assuming you have a User model for registered users
const User = require('../models/User');
const Location = require('../models/location');

// Controller to fetch all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();  // Fetch all users from PostgreSQL (or use MongoDB if preferred)
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// controllers/adminController.js
  // Assuming MongoDB model for location tracking

// Controller to fetch location logs for a user
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
            .skip((page - 1) * limit)
            .populate('userId', 'username email'); // Populate username and email from User model

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


module.exports = { getAllUsers, getLocationLogs};
