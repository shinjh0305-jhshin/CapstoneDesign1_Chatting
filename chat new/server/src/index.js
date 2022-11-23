import express from "express";
import socket from "socket.io";
import morgan from "morgan";
import "./db";
import authRouter from "./routers/authRouter";

const app = express();
const PORT = 9876;
const logger = morgan("dev");

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  next();
});

app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  return res.send("SERVER!!");
});

const handleListen = () => console.log(`🎸 Server listening on PORT ${PORT}`);

const server = app.listen(PORT, handleListen);

const io = socket(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "PUT", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("registerAll", (channels) => {
    channels.forEach((channel) => {
      socket.join(channel._id);
    });
  });
  socket.on("register", (channel) => {
    socket.join(channel._id);
  });
  socket.on("messageSent", (channel) => {
    socket.to(channel._id).emit("meesageReceived", channel);
  });
});
