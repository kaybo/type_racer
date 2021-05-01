const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
var cors = require('cors')

// our localhost port
const port = 4001

const app = express()
app.use(cors())

const generateWord = require('./helper');

app.get('/randomword', (req, res) => res.send(generateWord(20)));
// our server instance
const server = http.createServer(app)

// This creates our socket using the instance of the server
const io = require('socket.io')(server, { cors: {
    origins: ["*"],

    handlePreflightRequest: (req, res) => {
      res.writeHead(200, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST",
        "Access-Control-Allow-Headers": "my-custom-header",
        "Access-Control-Allow-Credentials": true
      });
      res.end();
    }}
});

// This is what the socket.io syntax is like, we will work this later
io.on('connection', socket => {
  console.log('New client connected')
  
  // just like on the client side, we have a socket.on method that takes a callback function
  socket.on('change color', (color) => {
    // once we get a 'change color' event from one of our clients, we will send it to the rest of the clients
    // we make use of the socket.emit method again with the argument given to use from the callback function above
    console.log('Color Changed to: ', color)
    io.sockets.emit('change color', color)
  })
  
  // disconnect is fired when a client leaves the server
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})



server.listen(port, () => console.log(`Listening on port ${port}`))