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
    origin: "http://34.227.157.219:3000",
    methods: ["GET", "POST"]
  }
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
