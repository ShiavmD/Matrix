const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    month: { type: String, required: true }, // e.g., "2024-06"
    skills: [String],
    tasksCompleted: Number,
    score: Number,
    generatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Report', reportSchema);
