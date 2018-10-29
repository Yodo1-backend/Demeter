'use strict';
var io = require('socket.io')(6666);

io.on('connection', function (socket) {
  socket.on('message', function () { });
  socket.on('disconnect', function () { });
});