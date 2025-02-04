import { io } from "socket.io-client";
export let socket = null;
export const socketClient = io("http://localhost:9090");

export const socketConnection = () => {
  socketClient.connect();
  console.log("connected");
  socket = socketClient;
};

export const socketDisconnection = () => {
  socketClient.disconnect();
  console.log("disconnected");
};

export const emitTyping = (data) => {
  if (socket) {
    socket.emit("typing", data);
  }
};

export const subscribeToTyping = (callback) => {
  if (socket) {
    socket.on("userTyping", callback);
  }
};

export const unsubscribeFromTyping = () => {
  if (socket) {
    socket.off("userTyping");
  }
};

export const subscribeToMessages = (selectedUserId) => {
  if (socket) {
    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser = newMessage.senderId === selectedUserId;
      if (!isMessageSentFromSelectedUser) return;
      console.log("New message received:", newMessage);

    });
  }
};

export const unsubscribeFromMessages = () => {
  if (socket) {
    socket.off("newMessage");
  }
};
