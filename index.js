// index.js
const http = require('http');
const fs = require('fs');
const path = require('path');
const socketio = require('socket.io');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading index.html');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (req.url === '/style.css') {
        fs.readFile(path.join(__dirname, 'style.css'), (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading style.css');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/css' });
                res.end(data);
            }
        });
    } else if (req.url === '/socket.io/socket.io.js') {
        fs.readFile(require.resolve('socket.io/client-dist/socket.io.js'), (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading socket.io.js');
            } else {
                res.writeHead(200, { 'Content-Type': 'application/javascript' });
                res.end(data);
            }
        });
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

const io = socketio(server);

io.on('connection', (socket) => {
    socket.on('chat message', (data) => {
        io.emit('chat message', data);
    });
});

const port = 5000;
server.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
