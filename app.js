const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// LISTENING TO SERVER ON PORT 3000
app.listen(3000);

// PARSING REQUEST TO JSON
app.use(bodyParser.json());

// ROUTES
app.get('/', (req, res) => res.send('goodbye world'));
const threadsRoute = require('./routes/threads');

// ROUTES MIDDLEWARES
app.use('/threads', threadsRoute);
