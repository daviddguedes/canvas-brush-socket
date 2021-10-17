const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

const lines = [];

io.on('connection', (socket) => {

    lines.forEach(line => {
        io.emit('draw', line);
    });

    socket.on('draw', (line) => {
        lines.push(line);
        io.emit('draw', line);
    })
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});