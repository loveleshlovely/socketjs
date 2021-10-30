var express = require('express');
var app = express();

const server = app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


const io = require('socket.io')(server , {
   cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});



io.on('connection', socket => {
  socket.on('request' , (message) => {
    console.log(message);
  })

  setInterval(function() {
    var rand = Math.floor(Math.random() * (10 - 0) + 0);
    
  socket.emit('request',  {
  "time_exchange": "2021-10-12T11:44:15.1073290Z",
  "time_coinapi": "2021-10-12T11:44:15.1743171Z",
  "uuid": "e9c5d30f-151b-484d-a019-ed9254da281a",
  "price": (57330.24) + (rand),
  "size": 0.00069483,
  "taker_side": "SELL",
  "symbol_id": "COINBASE_SPOT_BTC_USD",
  "sequence": 8408,
  "type": "trade"
    }); // emit an event to the socket  
  }, 1000);
  
  io.emit('broadcast', /* … */); // emit an event to all connected sockets
  socket.on('reply', () => { /* … */ }); // listen to the event
});



