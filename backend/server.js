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

wss.on('connection', function (ws) {
  pool.query('SELECT * FROM messages', (err, results, fields) => {
      if (err) throw err;
      ws.send(JSON.stringify({
        type: 'messages',
        data: results
      }));
  })

  ws.on('message', function (data) {
    const message = JSON.parse(data);

    if (message.type === 'chat_message') {
      pool.query('INSERT INTO messages (sender_name, message, sent_at) VALUES (?, ?, ?)', [message.sender_name, message.message, message.sent_at], (err, results, fields) => {
        if (err) throw err;
      })

      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(message));
        }
      })
    }
  })
})

server.listen(port, function () {
  console.log("Server is listening on port: " + port)
});