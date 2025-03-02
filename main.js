const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'ind.html'));
});

io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);
    socket.emit('connected', 'You are connected to the server');

    socket.on('setUsername', (username) => {
        socket.username = username; // Store username in the socket object
        console.log(`User ${socket.id} set their username as ${socket.username}`);
    });

    socket.on('chat message', (msg) => {
        console.log(`${socket.username || 'Unknown'}: ${msg}`);
        io.emit('msg', `${socket.username || 'Unknown'}: ${msg}`);
    });

    socket.on('connected to room', (room) => {
        socket.join(room);
        console.log(`Socket ${socket.id} joined room: ${room}`);
    });

    socket.on('disconnect', () => {
        console.log(`User ${socket.username || 'Unknown'} disconnected`);
        socket.broadcast.emit('userDisconnected', socket.id, socket.username || 'Unknown');
    });
});

httpServer.listen(3000, () => {
    console.log(`Server is listening`);
});