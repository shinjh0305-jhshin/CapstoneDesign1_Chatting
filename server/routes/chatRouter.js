import express from "express";
import {
  getAllRooms,
  enterRoom,
  checkUserInRoom,
  getChat,
  postChat,
} from "../controllers/chat";

const chatRouter = express.Router();

// api starts with rooms
chatRouter.get("/", getAllRooms);
chatRouter.post("/enter", enterRoom);
chatRouter.get("/:roomId/nickname/:nickname", checkUserInRoom);
chatRouter.get("/getChat/:roomId", getChat);
chatRouter.post("/saveChat", postChat);

export default chatRouter;
