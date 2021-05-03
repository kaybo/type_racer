const express = require('express')
const http = require('http')
var Mutex = require('async-mutex').Mutex;
const socketIO = require('socket.io')
var cors = require('cors')
const bodyParser = require('body-parser');

var PLAYER_CAPACITY = 2; //change this for the amount of players that can play at the same time

const mutex = new Mutex();

// our localhost port
const port = 4001

const app = express()
app.use(cors())

let progress = new Map();
let session = new Map();

const {generateWord, avgString} = require('./helper');

// console.log(avgString("test", "test123"))

let randomString = generateWord(20);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.post('/randomword', (req, res) => {
  console.log(req.body)
  mutex
    .acquire()
    .then(function(release) {
      if(!progress.has(req.body.id)){
        if(progress.size >= PLAYER_CAPACITY){
          console.log("progress size:", progress.size)
          res.send("The game is in progress, please wait until the game is finished.");
        }else{
          
          progress.set(req.body.id, 0);
          session.set(req.body.id, 15);
          console.log("progress size: ", progress.size)
        }
      }else{
        if(progress.size < PLAYER_CAPACITY){
          console.log("cap not filled")
          res.send("Please wait for another player to join.");
        }else{
          res.send(randomString)
        }
      }

      release();
    });
});



app.post('/updategame', (req,res)=>{
  console.log('updating!')
  res.send('hello!')
});


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





server.listen(port, () => console.log(`Listening on port ${port}`))