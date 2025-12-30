import io from "socket.io-client";

const socket = io("http://localhost:3001");

console.log("Socket client initialized:", socket);

socket.on("connect", () => {
  console.log("Socket connected:", socket.id);
});
//-----------------------Event Listeners-----------------------------------
socket.on("message", (data) => {
  console.log("Message from server:", data);
});
//-----------------------Event Listeners-----------------------------------
socket.on("disconnect", () => {
  console.log("Socket disconnected:", socket.id);
});
socket.on("error", (error) => {
  console.error("Socket error:", error);
});
