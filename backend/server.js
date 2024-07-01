require("dotenv").config();
const express = require("express");
const app = express();
const DbConnect = require("./database");
const router = require("./routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const ACTIONS = require("./actions");
const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use("/storage", express.static("storage"));
app.use(cookieParser());
const corsOptions = {
  credentials: true,
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 5500;
DbConnect();
app.use(express.json({ limit: "10mb" }));
app.use(router);

app.get("/", (req, res) => {
  res.send("Hello from Express Js!");
});

//sockets

const socketUserMapping = {};

io.on("connection", (socket) => {
  socket.on(ACTIONS.JOIN, ({ roomId, user }) => {
    socketUserMapping[socket.id] = user;
    const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);

    clients.forEach((clientId) => {
      io.to(clientId).emit(ACTIONS.ADD_PEER, {
        peerId: socket.id,
        createOffer: false,
        user,
      });
      socket.emit(ACTIONS.ADD_PEER, {
        peerId: clientId,
        createOffer: true,
        user: socketUserMapping[clientId],
      });
    });
    socket.join(roomId);
  });
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
