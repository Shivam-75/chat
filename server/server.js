// server.js
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

const users = {};

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('joinRoom', ({ username, room }) => {
        users[socket.id] = username;
        socket.join(room);

        socket.to(room).emit('notification', `${username} joined ${room}`);
        socket.emit('notification', `Welcome to ${room}, ${username}`);
    });

    socket.on('chatMessage', ({ room, message }) => {
        const username = users[socket.id];
        if (!username) return;

        io.to(room).emit('chatMessage', {
            username,
            message,
            time: new Date().toLocaleTimeString(),
        });
    });

    socket.on('leaveRoom', ({ room }) => {
        const username = users[socket.id];
        socket.leave(room);
        socket.to(room).emit('notification', `${username} left ${room}`);
    });

    socket.on('disconnect', () => {
        const username = users[socket.id];
        console.log(`${username || 'User'} disconnected.`);
        delete users[socket.id];
    });
});

server.listen(3000, () => {
    console.log('Server listening on http://localhost:3000');
});
