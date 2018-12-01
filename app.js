const express = require('express');
const app = express();

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index')
})

server = app.listen(3000, function (){
  console.log('server is listening for requests on port 3000')
})

//socket installation on the server
const io = require("socket.io")(server)

//io object will give us access to the socket.io library.
//io object listens to each connection to the app
io.on('connection', (socket) => {
  console.log('New user connected')

	//default username
	socket.username = "Guest"

    //listen on change_username
    socket.on('change_username', (data) => {
        socket.username = data.username
    })

    //listen on new_message
    socket.on('new_message', (data) => {
        //broadcast the new message
        io.sockets.emit('new_message', {message : data.message, username : socket.username});
    })

    socket.on('typing', (data) => {
      socket.broadcast.emit('typing', {username: socket.username})
    })

})
