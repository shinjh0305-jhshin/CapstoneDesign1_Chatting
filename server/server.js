import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import socket from "socket.io";
import userRouter from "./routes/userRouter";
import chatRouter from "./routes/chatRouter";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Max-Age", 600);
  next();
});

app.use("/users", userRouter);
app.use("/rooms", chatRouter);

const server = app.listen(process.env.SERVER_PORT, () => {
  console.log(` Server running on ${process.env.SERVER_PORT}`);
});

const io = socket(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT"],
  },
});

io.on("connection", (socket) => {
  /*
  socket.on("registerAll", (rooms) => {
    rooms.forEach((room) => {
      socket.join(room.roomId);
    });
  });
  socket.on("register", (room) => {
    socket.join(room.roomId);
  });
  */
  socket.on("messageSent", (roomInfo) => {
    //console.log("socket On:", roomInfo);
    //roomInfo.time = new Date(roomInfo.time);
    console.log("SEND FROM SERVER - roomInfo:", roomInfo);
    io.to(roomInfo.roomId).emit("messageReceived", roomInfo);
  });
  socket.on("leaveRoom", (roomInfo) => {
    console.log("LEAVE ROOM", roomInfo);
    socket.leave(roomInfo.roomId);
  });
  socket.on("joinRoom", (roomInfo) => {
    console.log("JOIN ROOM", roomInfo);
    socket.join(roomInfo.roomId);
  });
  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
    //socket.leave(roomInfo.roomId);
  });
});

/*

// Amazon Cognito 인증 공급자를 초기화합니다
CognitoCachingCredentialsProvider credentialsProvider = new CognitoCachingCredentialsProvider(
    getApplicationContext(),
    "ap-northeast-2:66deae64-0df4-4de4-9be2-10ef9113937b", // 자격 증명 풀 ID
    Regions.AP_NORTHEAST_2 // 리전
);

 */
