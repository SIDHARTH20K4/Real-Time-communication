const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('signal', (data) => {
        socket.broadcast.emit('signal', data);
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    })
})

httpServer.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});