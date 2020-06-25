const express = require('express');

const router = express.Router();
const Threads = require('../models/Thread');

router.get('/', async (req, res) => {
    try {
        const msgs = await Threads.find();
        res.json(msgs);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.post('/', async (req, res) => {
    const { message } = req.body;
    const thread = new Threads({
        message
    });
    try {
        const savedThread = await thread.save();
        res.status(201).json(savedThread);
    } catch (error) {
        res.status(400).json(error);
    }
});


module.exports = router;