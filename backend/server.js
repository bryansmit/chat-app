const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const mysql = require('mysql');

const port = 3001;
const server = http.createServer(express);
const wss = new WebSocket.Server({server});

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'host.docker.internal',
  user: 'user',
  password: 'password',
  database: 'chat_app'
})

// pool.query('SELECT * FROM messages', (err, results, fields) => {
//   wss.clients.forEach(function (client) {
//     if (err) throw err;
//
//     client.send(results);
//   })
// })

wss.on('connection', function (ws) {
  ws.on('message', function (data) {
    wss.clients.forEach(function (client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    })
  })
})

server.listen(port, function () {
  console.log("Server is listening on port: " + port)
});