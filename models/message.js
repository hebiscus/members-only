const mongoose = require('mongoose');
const User = require('./user');

const messageSchema = new mongoose.Schema({
    author: {type: mongoose.Schema.ObjectId, ref: User},
    title: {type: String, required: true},
    content: String,
    timestamp: {type: Date, default: Date.now, required: true}
});

module.exports = mongoose.model("Message", messageSchema);