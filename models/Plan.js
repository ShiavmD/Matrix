const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['5-day', '7-day'], required: true },
    startDate: { type: Date, required: true },
    tasks: [
        {
            day: Number,
            description: String,
            skill: String
        }
    ],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Plan', planSchema);
