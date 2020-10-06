const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const chatRoutes = require('./routes');
const io = require('socket.io')(app.listen(port, '0.0.0.0'));

app.set('view engine', 'ejs')
app.use(express.static(__dirname + "./public"));
app.use("", chatRoutes)
io.on('connection', (socket) => {
    console.log('New user connected');
    socket.emit('new_message', 'Hello there!');
    socket.on('send-chat-message', (message) => {
        socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
    });
    socket.on('new-user', (name) => {
        users[socket.id] = name;
        socket.broadcast.emit('user-connected', name)

    })
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id];

    })

})
// routes



