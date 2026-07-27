import { Server } from "socket.io";
import http from "http";

const userSocketMap = {};
let io;

export function initSocket(app) {
  const server = http.createServer(app);

  io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173", process.env.CLIENT_URL].filter(Boolean),
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) userSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });

  return server;
}

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

export function getIO() {
  return io;
}