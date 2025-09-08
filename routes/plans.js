const express = require('express');
const Plan = require('../models/Plan');
const router = express.Router();

// Submit a new plan
router.post('/', async (req, res) => {
    try {
        const plan = new Plan(req.body);
        await plan.save();
        res.status(201).json(plan);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all plans for a user
router.get('/:userId', async (req, res) => {
    try {
        const plans = await Plan.find({ userId: req.params.userId });
        res.json(plans);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
