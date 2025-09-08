const express = require('express');
const Report = require('../models/Report');
const router = express.Router();

// Generate a report (dummy logic for now)
router.post('/generate', async (req, res) => {
    try {
        const { userId, month, skills, tasksCompleted, score } = req.body;
        const report = new Report({ userId, month, skills, tasksCompleted, score });
        await report.save();
        res.status(201).json(report);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get reports for a user
router.get('/:userId', async (req, res) => {
    try {
        const reports = await Report.find({ userId: req.params.userId });
        res.json(reports);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
