// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://44.212.21.75:3000",
    methods: ["GET", "POST"]
  }
});

const activeUsers = new Set();

io.on('connection', (socket) => {
  socket.on('check-username', (username, callback) => {
    if (activeUsers.has(username)) {
      callback(false);
    } else {
      activeUsers.add(username);
      callback(true);
      socket.username = username;
    }
  });

  socket.on('disconnect', () => {
    if (socket.username) {
      activeUsers.delete(socket.username);
    }
  });
});

io.on('connection', (socket) => {
  console.log('Usuario conectado');

  socket.on('message', (message) => {
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});

server.listen(5000, () => {
  console.log('Servidor corriendo en puerto 5000');
});
