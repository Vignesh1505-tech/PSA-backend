// socket.js
const { Server } = require("socket.io");

let io;

function setupSocket(server) {
  io = new Server(server, {
    pingTimeout: 60000,
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('register', (userId) => {
      socket.join(userId);
      console.log(`User registered: ${userId} with socket ID: ${socket.id}`);
    })
    
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
}

function getSocket() {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
}

module.exports = { setupSocket, getSocket };