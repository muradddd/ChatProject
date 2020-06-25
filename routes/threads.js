const express = require('express');

const router = express.Router();
const Threads = require('../models/Thread');

router.get('/', (req, res) => res.send('threads'));

router.post('/', async (req, res) => {
    const { message } = req.body;
    const thread = new Threads({
        message
    });
    try {
        const savedThread = await thread.save();
        res.status(201).json(savedThread);
    } catch (error) {
        res.json(error);
    }

});


module.exports = router;