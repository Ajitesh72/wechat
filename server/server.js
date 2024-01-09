const express = require('express');
const morgan = require('morgan');
const cors = require('cors'); // Import the cors middleware
const cookieParser =require("cookie-parser");

const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Use morgan middleware to log HTTP requests
app.use(morgan('combined'));
app.use(cors({
  origin: ["http://localhost:3000"],
  // credentials: true,
}));

app.use(cookieParser());


// Socket.IO connection event
io.on('connection', (socket) => {
  console.log(`A user:${socket.id} connected`);

  // Listen for chat messages
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg); // Broadcast the message to all connected clients
    console.log(msg)
    console.log(socket.id)
  });

  // Disconnect event
  socket.on('disconnect', () => {
    console.log(`A user:${socket.id} disconnected`);
  });
});

// Start the server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
