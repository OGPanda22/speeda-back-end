const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const router = express.Router();

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password || password.length < 8) {
    return res.status(400).json({ error: 'Username and password (min 8 chars) required.' });
  }

  const existing = await User.findOne({ username });
  if (existing) return res.status(400).json({ error: 'Username taken' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, hashedPassword });
  req.session.userId = user._id;
  res.json({ user: { username: user.username } });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ error: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.hashedPassword);
  if (!valid) return res.status(400).json({ error: 'Invalid credentials' });
  req.session.userId = user._id;
  res.json({ user: { username: user.username } });
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => res.json({ message: 'Logged out' }));
});

router.get('/profile', async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ error: 'Not authenticated' });
  const user = await User.findById(req.session.userId);
  if (!user) return res.status(401).json({ error: 'User not found' });
  res.json({ user: { username: user.username } });
});

module.exports = router;