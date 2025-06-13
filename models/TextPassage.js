const mongoose = require('mongoose');

const passageSchema = mongoose.Schema({
    content: {
        type: String,
        required: true },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User',
        },
});

// Create model
const Passage = mongoose.model('Passage', passageSchema);

// Export model
module.exports = Passage;