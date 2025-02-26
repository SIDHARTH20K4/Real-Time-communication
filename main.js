const { Socket } = require('dgram');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

io.on('connection', (socket) => {
    console.log('connected to the server');

    socket.on('chat message', (msg) => {
        console.log('recieved message is: ' + msg);
        socket.emit('msg', "recieved message from the client");
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from the server');
    });
})

httpServer.listen(3000, () => {
    console.log('server is listening');
})