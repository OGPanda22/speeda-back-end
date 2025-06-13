const express = require('express');
const router = express.Router();
const TextPassage = require('../models/TextPassage');
const User = require('../models/user');
const auth = require('../middleware/auth');

router.get('/passages/random', async (req, res) => {
  const passages = await TextPassage.find();
  const passage = passages[Math.floor(Math.random() * passages.length)];
    res.json(passage);
});

router.post('/passages', auth, async (req, res) => {
  const user = await User.findById(req.session.userId);
  if (user.role !== 'admin') 
    return res.status(403).json({ error: 'Forbidden' });

  const passage = await TextPassage.create({ content: req.body.content, createdBy: user._id });
    res.status(201).json(passage);
});

module.exports = router;
