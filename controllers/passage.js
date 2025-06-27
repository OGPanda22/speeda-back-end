const express = require('express');
const TestPassage = require('../models/TextPassage');
const router = express.Router();

router.get('/', async (req, res) => {
  const passages = await TestPassage.find();
  res.json(passages);
});

router.post('/', async (req, res) => {
  const { content } = req.body;
  const passage = new TestPassage({ content });
  await passage.save();
  res.status(201).json(passage);
});

module.exports = router;

