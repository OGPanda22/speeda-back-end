const mongoose = require('mongoose');

const testSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  wpm: Number,
  cpm: Number,
  mistakes: Number,
  accuracy: Number,
  dateTaken: { type: Date, default: Date.now }
});

// Create model
const Test = mongoose.model('Test', testSchema);

// Export model
module.exports = Test;
