const express = require('express');
const router = express.Router();
const Test = require('../models/TypingTest');
const auth = require('../middleware/auth');

router.post('/tests', auth, async (req, res) => {
  const { wpm, cpm, mistakes, accuracy } = req.body;
  const test = await Test.create({ user: req.session.userId, wpm, cpm, mistakes, accuracy });
    res.status(201).json(test);
});

router.get('/users/:id/tests', async (req, res) => {
  const tests = await Test.find({ user: req.params.id }).sort({ dateTaken: -1 });
    res.json(tests);
});

module.exports = router;