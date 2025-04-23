const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// File path for appointments.json
const APPOINTMENT_FILE = path.join(process.cwd(), '/database/appointments.json');
// console.log('Appointment file path:', APPOINTMENT_FILE);

// Get all appointments
router.get('/', (req, res) => {
  fs.readFile(APPOINTMENT_FILE, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ message: 'Failed to load appointments.' });
    }
    try {
      const appointments = JSON.parse(data);
      res.json(appointments);
    } catch (e) {
      console.error('Error parsing JSON:', e);
      return res.status(500).json({ message: 'Failed to parse appointments data.' });
    }
  });
});

// Create new appointment
router.post('/', (req, res) => {
  const newAppointment = req.body;

  fs.readFile(APPOINTMENT_FILE, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ message: 'Failed to read appointments data.' });
    }

    try {
      const appointments = JSON.parse(data);
      newAppointment.id = Date.now(); // Generate a unique ID based on timestamp
      appointments.push(newAppointment);

      fs.writeFile(APPOINTMENT_FILE, JSON.stringify(appointments, null, 2), (err) => {
        if (err) {
          console.error('Error writing file:', err);
          return res.status(500).json({ message: 'Failed to save new appointment.' });
        }
        res.status(201).json(newAppointment);
      });
    } catch (e) {
      console.error('Error parsing JSON:', e);
      return res.status(500).json({ message: 'Failed to parse or update appointment data.' });
    }
  });
});

module.exports = router;
