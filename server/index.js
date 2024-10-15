const express = require('express');
const app = express();
const server = require('http').createServer(app);
const { Server } = require('socket.io')
const path = require('path')

const io = new Server(server);
const port = 8080;

app.use(express.static(path.join(__dirname, '../app')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../app/index.html'))
})

io.on('connection', (socket) => {
    console.log('A user connected.');
    
    socket.on('message', (message) => {
        console.log(message)
        io.emit('message', `${socket.id.substr(0, 2)} said ${message}`)
    })
})

server.listen(port, () => {
    console.log(`Listening on port ${port}.`)
})