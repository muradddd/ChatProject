const express = require('express');

const router = express.Router();
const Threads = require('../models/Thread');

router.get('/', (req, res) => res.send('threads'));

router.post('/', async (req, res) => {
    const { user } = req.body;
    const thread = new Threads({
        user
    });
    try {
        const savedThread = await thread.save();
        res.json(savedThread);
    } catch (error) {
        res.json(error);
    }

});


module.exports = router;