const socketMain = (io) => {
  io.on("connection", (socket) => {
    const id = socket.id;
    console.log("Socket connected:", id);
    socket.emit("message", "Hello from worker");

    // receive systemInfo from node client
    socket.on("info", (data) => {
      console.log("received");
      io.emit("info", data);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", id);
    });
  });
};

module.exports = socketMain;
