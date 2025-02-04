import { Server as IOServer } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);
const frontendUrl = 'http://localhost:5173';
const io = new IOServer(server, {
  cors: {
    origin: [frontendUrl],
  },
});

const userSocketMap = {};
const typingUsers = new Map(); 

const getReceiverSocketId = (userId) => userSocketMap[userId];

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);
  const { userId } = socket.handshake.query;
  if (userId) userSocketMap[userId] = socket.id;
  io.emit('getOnlineUsers', Object.keys(userSocketMap));

  socket.on('typing', ({ conversationId, userId, isTyping }) => {
    const receiverSocketId = getReceiverSocketId(conversationId);
    
    if (isTyping) {
      typingUsers.set(`${conversationId}-${userId}`, true);
    } else {
      typingUsers.delete(`${conversationId}-${userId}`);
    }

    if (receiverSocketId) {
      io.to(receiverSocketId).emit('userTyping', {
        conversationId,
        userId,
        isTyping,
      });
    }
  });

  socket.on('disconnect', () => {
    console.log('a user disconnect', socket.id);

    if (userId) {
      const userTypingEntries = Array.from(typingUsers.entries())
        .filter(([key]) => key.includes(userId));
      userTypingEntries.forEach(([key]) => typingUsers.delete(key));
    }
    delete userSocketMap[userId];
    io.emit('getOnlineUsers', Object.keys(userSocketMap));
  });
});

export { io, app, server, getReceiverSocketId };
