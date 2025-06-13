const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const auth = require('../middleware/auth');

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  if (password.length < 8) 
    return res.status(400).json({ error: 'Password too short' });

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ username, hashedPassword });
    req.session.userId = user._id;
    res.status(201).json({ message: 'User created', user });
  } catch (err) {
    res.status(400).json({ error: 'Username already taken' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) return res.status(400).json({ error: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.hashedPassword);
  if (!valid) return res.status(400).json({ error: 'Invalid credentials' });
  req.session.userId = user._id;
  res.json({ message: 'Logged in', user });
});

router.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ message: 'Logged out' });
});

router.get('/profile', auth, async (req, res) => {
  const user = await User.findById(req.session.userId);
  res.json(user);
});

module.exports = router;