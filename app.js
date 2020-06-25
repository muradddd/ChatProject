const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv/config');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');


// SET STATIC FOLDER
app.use(express.static(path.join(__dirname, 'public')));

// CREAT SERVER
const server = http.createServer(app);

// CREAT SOCKET
const io = socketio(server);

io.on('connection', socket => {
    // SINGLE CLIENT
    socket.emit('message', 'Welcome to ChatProject');

    // ALL CLIENTS
    io.emit('message', 'SALAM!');

    // ALL CLIENTS EXCEPT CONNECTING CLIENT
    socket.broadcast.emit('message', 'Filankes cata qosuldu');

    // CLIENT DISCONNECT EVENT
    socket.on('disconnect', () => {
        io.emit('message', 'Filankes cati terk etdi');
    });

    // CATCHING USER MSG
    socket.on('chatMsg', msg => {
        console.log(msg);
        io.emit('message', msg);
    });
});


// LISTENING TO SERVER ON PORT 3000
server.listen(3000, () => {
    console.log('listening posrt 3000');
});

// PARSING REQUEST TO JSON
app.use(bodyParser.json());

// ROUTES
app.get('/', (req, res) => res.send('goodbye world'));
const threadsRoute = require('./routes/threads');
const { disconnect } = require('process');

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
