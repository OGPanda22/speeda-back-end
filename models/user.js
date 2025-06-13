const mongoose = require('mongoose');

//schema
const userSchema = mongoose.Schema({

    /*username*/
    /*unique ensures no dupe usernames*/
    username: {
        type: String,
        required: true,
        unique: true,
    },

    /*password*/
    hashedPassword: {
        type: String,
        required: true
    },

    /*player or admin*/
    /*enum allows you to define a set of named constants*/
    role: {
        type: String,
        enum: ['player', 'admin'],
        default: 'player'
    },
});

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
    delete returnedObject.hashedPassword;
  },
});

// Create model
const User = mongoose.model('User', userSchema);

// Export model
module.exports = User;