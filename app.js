const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv/config');

// LISTENING TO SERVER ON PORT 3000
app.listen(3000);

// PARSING REQUEST TO JSON
app.use(bodyParser.json());

// ROUTES
app.get('/', (req, res) => res.send('goodbye world'));
const threadsRoute = require('./routes/threads');

// ROUTES MIDDLEWARES
app.use('/threads', threadsRoute);

// CONNECT TO DATABASE
mongoose.connect(process.env.DB_CONNECTION,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: process.env.DB_NAME,
    })
    .catch(err => console.log(err));  // Error on initial connection

mongoose.connection.on('error', err => console.log(err)); // Error after initial connection was established
