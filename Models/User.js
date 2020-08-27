const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        default: 'User',
        enum: [ 'User', 'Admin' ],
    },

    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    date: {
        type: Date,
        default: Date.now,
    },

});

module.exports = mongoose.model('User', UserSchema);;