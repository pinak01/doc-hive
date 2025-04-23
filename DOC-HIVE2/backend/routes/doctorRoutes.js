const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Helper: file path for doctors.json
const doctorsFilePath = path.join(process.cwd(), 'database', 'doctors.json');

// Get all doctors
router.get('/', (req, res) => {
  fs.readFile(doctorsFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading doctors file:', err);
      return res.status(500).json({ message: 'Failed to load doctors.' });
    }
    try {
      const doctors = JSON.parse(data);
      res.json(doctors);
    } catch (e) {
      console.error('Error parsing doctors JSON:', e);
      return res.status(500).json({ message: 'Failed to parse doctors data.' });
    }
  });
});

// Login endpoint for doctors
router.post('/login', (req, res) => {
  const { doctorID, password } = req.body;
  fs.readFile(doctorsFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading doctors file:', err);
      return res.status(500).json({ message: 'Failed to read doctors data.' });
    }
    try {
      const doctors = JSON.parse(data);
      const doctor = doctors.find(
        (doc) => doc.doctorID === doctorID && doc.password === password
      );
      if (doctor) {
        res.json({ message: 'Login successful', doctor });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (e) {
      console.error('Error parsing doctors JSON:', e);
      return res.status(500).json({ message: 'Failed to parse doctors data.' });
    }
  });
});

// Signup endpoint for doctors
router.post('/signup', (req, res) => {
  let newDoctor = req.body;
  fs.readFile(doctorsFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading doctors file:', err);
      return res.status(500).json({ message: 'Failed to read doctors data.' });
    }
    try {
      const doctors = JSON.parse(data);
      // Check if doctor already exists using doctorID
      const exists = doctors.find((doc) => doc.doctorID === newDoctor.doctorID);
      if (exists) {
        return res.status(400).json({ message: 'Doctor already exists with this ID.' });
      }
      
      // Convert separate latitude & longitude fields into a location object if present
      if(newDoctor.latitude && newDoctor.longitude) {
        newDoctor.location = { 
          latitude: parseFloat(newDoctor.latitude), 
          longitude: parseFloat(newDoctor.longitude) 
        };
        delete newDoctor.latitude;
        delete newDoctor.longitude;
      }
      
      // Rename contactNumber to contact if needed
      if(newDoctor.contactNumber) {
        newDoctor.contact = newDoctor.contactNumber;
        delete newDoctor.contactNumber;
      }
      
      // Ensure numerical fields are correctly typed (age, appointmentCost)
      newDoctor.age = parseInt(newDoctor.age, 10);
      newDoctor.appointmentCost = parseFloat(newDoctor.appointmentCost);
      
      // Append the new doctor to the array
      doctors.push(newDoctor);
      
      fs.writeFile(doctorsFilePath, JSON.stringify(doctors, null, 2), (err) => {
        if (err) {
          console.error('Error writing doctors file:', err);
          return res.status(500).json({ message: 'Failed to save new doctor.' });
        }
        res.status(201).json({ message: 'Doctor created successfully.' });
      });
    } catch (e) {
      console.error('Error parsing doctors JSON:', e);
      return res.status(500).json({ message: 'Failed to parse doctors data.' });
    }
  });
});

module.exports = router;
