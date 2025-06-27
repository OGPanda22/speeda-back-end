const express = require('express');
const TypingTest = require('../models/TypingTest');
const router = express.Router();

router.post('/', async (req, res) => {
  const { wpm, cpm, mistakes, accuracy, passageId } = req.body;
  const test = new TypingTest({
    userId: req.session.userId,
    passageId,
    wpm,
    cpm,
    mistakes,
    accuracy
  });
  await test.save();
  res.status(201).json(test);
});

router.get('/', async (req, res) => {
  const tests = await TypingTest.find({ userId: req.session.userId });
  res.json(tests);
});

module.exports = router;