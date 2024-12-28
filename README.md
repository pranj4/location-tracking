# Real-Time Location Tracking System

## Project Overview

This project is a real-time location tracking system designed to handle live GPS data from multiple users. The system includes a backend for processing location data and a frontend for displaying the information on an interactive map. The backend can scale to handle at least 500 simultaneous users.

## Features

- **User Authentication**: Secure login and access control using tokens
- **Real-Time Tracking**: Periodic updates of user locations sent to the server
- **Filterable Map**: View and filter location logs on an interactive map
- **Scalability**: Designed to support high concurrency

## Tech Stack

### Backend
- Node.js
- Express.js
- PostgreSql
- MongoDB (with Mongoose)

### Frontend
- HTML, CSS, JavaScript
- Leaflet.js (for map rendering)

## Deployment

- GitHub (version control)

## System Architecture

### Frontend
- Displays real-time user locations on a map
- Allows filtering by user and date range

### Backend
- Processes and stores user location data
- Serves location logs to authorized clients

### Database
- Stores user details and location logs
- Redis Cache optimizes frequent read operations

## Usage

Log in using your credentials.

Start location tracking using the "Start Tracking" button.

View real-time locations and logs on the map.

Filter logs by user and date range.


## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/pranj4/location-tracking.git
cd location-tracking
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a .env file and add the following:

```bash
DB_HOST=localhost
DB_PORT=5432
DB_NAME=tracking
DB_USER=postgres
DB_PASSWORD=iamgame25...
MONGO_URI=mongodb://localhost:27017/tracking_db
JWT_SECRET=password
```

### 4. Run the Backend Server

```bash
npm run dev
```

### 5. Database Setup

PostgreSQL
```bash

# Create database
CREATE DATABASE locationtracker;

# Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user'
);
```
![image](https://github.com/user-attachments/assets/06906a7b-813d-44ab-8ffb-41a70e6e9e05)


MongoDB

Ensure MongoDB is running
Collections will be created automatically

![image](https://github.com/user-attachments/assets/de0ba631-b452-4613-9337-713be6f76a77)


### 6. Access the Frontend by going to register page and registering

Open  http://localhost:3000/register.html  in any browser.

A basic registration page has been set up 

![image](https://github.com/user-attachments/assets/5ba1444c-b0bb-41a3-99a7-4e7173b1e55d)

Register as new user or if already registered . Click on login here 

![image](https://github.com/user-attachments/assets/fde22fce-40dc-4d34-a2b8-9cd4c76f1b25)


## Workflows

### User Workflow

-Sign Up / Log In

The user registers an account or logs into the system using their credentials.

![image](https://github.com/user-attachments/assets/5805efc1-ded6-4caf-88f2-a860ceaa2b4a)



Start Tracking

Once authenticated, the user starts tracking their live location by enabling GPS on their device.

The location is periodically sent to the backend.

![image](https://github.com/user-attachments/assets/c1bca212-df39-4a74-80f5-49b06bea159a)


Stop Tracking

The user can stop tracking their location at any time.


### Admin Workflow

Admin Log In

The admin logs in using an authorized account with elevated privileges.


![image](https://github.com/user-attachments/assets/8861e22e-1595-4848-b3ac-91e24dcfa775)


View All User Locations

The admin accesses a dashboard displaying all active users and their live locations.

![image](https://github.com/user-attachments/assets/4701fdaa-d8be-4c4f-bc38-868e87204741)


![image](https://github.com/user-attachments/assets/ad6830a2-a44f-426a-a9d7-c22c3e8cf061)


Apply Filters

The admin filters user data by date, username, or specific regions on the map.

##API Endpoints

### Authentication
```bash
POST /api/auth/register - User registration
POST /api/auth/login - User login
```
Location
```bash
POST /api/location/track - Send live location
GET /api/location/logs/:userId - Fetch user location logs
GET /api/location/location-logs - Admin: Fetch all location logs
```
## Security Features

-JWT-based authentication
-Password hashing
-Role-based access control
-Input validation
-Secure API endpoints

## Scalability Enhancements

- Implement database indexing

- Use connection pooling

- Optimize query performance

## Cloud Deployment

Supported Platforms:

AWS Elastic Beanstalk

Heroku

Vercel

## Performance Optimization

- Implemented connection pooling

- Efficient database indexing

- Minimal payload transfer

- Integrated logging middleware
 
- Error tracking

## Acknowledgements 

- Leaflet.js
- Express.js
- PostgreSQL
- MongoDB

## Troubleshooting
- Ensure all environment variables are correctly set
- Check network configurations
- Verify database connections
- Review authentication middleware
- Check browser console for frontend errors








