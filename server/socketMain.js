const socketMain = (io) => {
  io.on("connection", (socket) => {
    const id = socket.id;
    socket.emit("message", "Hello from worker");

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });
};

module.exports = socketMain;
