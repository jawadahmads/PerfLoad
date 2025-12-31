import io from "socket.io-client";

export const socket = io("http://localhost:3001");

console.log("Socket client initialized:", socket);

socket.on("connect", () => {
  console.log("Socket connected:", socket.id);
});
//-----------------------Event Listeners-----------------------------------

//-----------------------Event Listeners-----------------------------------
socket.on("disconnect", () => {
  console.log("Socket disconnected:", socket.id);
});
socket.on("error", (error) => {
  console.error("Socket error:", error);
});
