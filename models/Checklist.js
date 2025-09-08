const mongoose = require('mongoose');

const checklistSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    planId: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan', required: true },
    date: { type: Date, required: true },
    completed: { type: Boolean, default: false }
});

module.exports = mongoose.model('Checklist', checklistSchema);
