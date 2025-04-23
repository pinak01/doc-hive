const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

// Route modules
const doctorRoutes = require('../routes/doctorRoutes');
const patientRoutes = require('../routes/patientRoutes');
const appointmentRoutes = require('../routes/appointmentRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API Routes
app.use('/api/doctors', doctorRoutes);
app.use('/api/users', patientRoutes);
app.use('/api/appointments', appointmentRoutes);

// Export for serverless functions
module.exports = app;
