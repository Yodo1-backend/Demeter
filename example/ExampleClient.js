var io = require('socket.io-client');


var socket = io('http://localhost:6666/');
socket.on('connect', function () {
  socket.send('hi');

  socket.on('message', function (msg) {
    // my msg
  });
});