const express = require('express');

const app = express();

// LISTENING TO SERVER ON PORT 3000
app.listen(3000);

// ROUTES
app.get('/', (req, res) => res.send('goodbye world'));
