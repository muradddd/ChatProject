const mongoose = require('mongoose');

const TreadSchema = mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Threads', TreadSchema);