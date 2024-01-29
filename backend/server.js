const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const port = 3001;
const server = http.createServer(express);
const wss = new WebSocket.Server({server});

wss.on('connection', function(ws) {
    ws.on('message', function(data) {
        wss.clients.forEach(function(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        })
    })
})

server.listen(port, function () {
    console.log("Server is listening on port: " + port)
});