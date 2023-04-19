const express = require('express')
const app = express()
const http = require('http');
const server = http.createServer(app);
const cors = require('cors');

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  },
  path: "/ws"
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('a user disconnect');
  })
  socket.on('foo', (data) => {
    console.log('a user emit foo event with param:', data);
    socket.emit('bar', { msg: 'Sekarang tuh jam: ' + new Date() })
  })
});

app.use(cors({ origin: '*' }));
app.use(express.json());
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/external.html');
})

app.get('/api', (req, res) => {
  res.send({ msg: 'hello /api' })
})

app.post('/api/daftar', (req, res) => {
  res.send({
    usrHeaders: req.headers,
    usrBody: req.body
  })
})

app.get('/api/baba', (req, res) => {
  res.send({ msg: 'hello /api/baba' })
})

app.get('/api/caca', (req, res) => {
  res.send({ msg: 'hello /api/caca' })
})

server.listen(5000, () => {
  console.log('Example app listening on *:5000');
});