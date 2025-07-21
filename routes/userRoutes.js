const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const DATA_FILE = path.join(__dirname, '../data/users.json');

// Helper: Load users from file
function loadUsers() {
  if (!fs.existsSync(DATA_FILE)) return [];
  const data = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(data);
}

// Helper: Save users to file
function saveUsers(users) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
}

// GET /api/users — List all users
router.get('/', (req, res) => {
  const users = loadUsers();
  res.json(users);
});

// POST /api/users — Create a new user
router.post('/', (req, res) => {
  const { username, email } = req.body;

  if (!username || !email) {
    return res.status(400).json({ message: 'Username and email are required.' });
  }

  const users = loadUsers();

  // Check if user already exists
  if (users.some(user => user.username === username)) {
    return res.status(409).json({ message: 'Username already exists.' });
  }

  const newUser = {
    id: Date.now(), // simple unique ID
    username,
    email
  };

  users.push(newUser);
  saveUsers(users);

  res.status(201).json({ message: 'User created successfully.', user: newUser });
});

module.exports = router;
 
