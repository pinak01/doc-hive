const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// File path for users.json
const usersFilePath = path.join(process.cwd(), 'database', 'users.json');

// Get all users
router.get('/', (req, res) => {
  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ message: 'Failed to load users.' });
    }
    try {
      const users = JSON.parse(data);
      res.json(users);
    } catch (e) {
      console.error('Error parsing JSON:', e);
      return res.status(500).json({ message: 'Failed to parse user data.' });
    }
  });
});

// Endpoint to handle sign-up (PATCH request to add new user)
router.patch('/', (req, res) => {
  const newUser = req.body; // Expecting { "email@example.com": { ... } }

  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ message: 'Failed to read users data.' });
    }
    try {
      const usersData = JSON.parse(data);
      const userKey = Object.keys(newUser)[0];

      if (usersData[userKey]) {
        return res.status(400).json({ message: 'User already exists with this email.' });
      }

      // Merge new user into the existing users
      const updatedUsers = { ...usersData, ...newUser };

      fs.writeFile(usersFilePath, JSON.stringify(updatedUsers, null, 2), (err) => {
        if (err) {
          console.error('Error writing file:', err);
          return res.status(500).json({ message: 'Failed to save new user.' });
        }
        res.status(201).json({ message: 'User created successfully.' });
      });
    } catch (e) {
      console.error('Error parsing JSON:', e);
      return res.status(500).json({ message: 'Failed to parse or update user data.' });
    }
  });
});

module.exports = router;
