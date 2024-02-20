const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const { Server: SocketServer } = require('socket.io');
const Partida = require('../routers/partida.route');
const Jugador = require('../routers/jugador.route');
const { log } = require('console');

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: "http://localhost:5173"
  }
});

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use('/players', Jugador);
app.use('/match', Partida);

io.on('connection', (socket) => {
  console.log('Usuario conectado:', socket.id);

  socket.on('crearPartida', (partida) => {
    socket.join(partida);
    console.log(`Partida creada: ${partida}`);
    socket.emit('mensaje')
  });

  socket.on('unirsePartida', (idPartida) => {
    socket.join(idPartida+1);
    console.log(`Jugador ${socket.id} se ha unido a la partida: ${idPartida+1}`);
    socket.emit('mensaje')
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});

module.exports = io;