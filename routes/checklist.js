const express = require('express');
const Checklist = require('../models/Checklist');
const router = express.Router();

// Mark checklist for a day
router.post('/', async (req, res) => {
    try {
        const checklist = new Checklist(req.body);
        await checklist.save();
        res.status(201).json(checklist);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get checklist for a user and plan
router.get('/:userId/:planId', async (req, res) => {
    try {
        const items = await Checklist.find({
            userId: req.params.userId,
            planId: req.params.planId
        });
        res.json(items);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
