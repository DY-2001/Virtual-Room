import io from "socket.io-client";

const socketInit = () => {
  const options = {
    "force new connection": true,
    reconnectionAttempts: "Infinity",
    timeout: 10000,
    transports: ["websocket"],
  };

  return io("https://virtual-room-lgv9.vercel.app", options);
};

export default socketInit;
