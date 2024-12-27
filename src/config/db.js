const { Sequelize } = require('sequelize');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

console.log("MongoDB URI:", process.env.MONGO_URI);

// Initialize Sequelize (PostgreSQL)
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        logging: false, // Disable logging to keep it clean
    }
);

// Function to connect to PostgreSQL
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('PostgreSQL connected!');

        // Synchronize all defined models with the database
        await sequelize.sync({ alter: true });
        console.log('Database synchronized!');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

// Function to connect to MongoDB
const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected!');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
};

// Export both PostgreSQL and MongoDB functions
module.exports = { sequelize, connectDB, connectMongoDB };
