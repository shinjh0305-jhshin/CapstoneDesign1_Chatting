import express from "express";
import User from "../models/user";

const authRouter = express.Router();

const getRegister = (req, res) => {
  return res.send("register");
};

const postRegister = async (req, res) => {
  console.log("REGISTER!!");
  return res.json({ message: "Hahahaha", loggedIn: false });
};

const postLogin = async (req, res) => {
  console.log("SERVER:LOGIN!!");
  return res.json({
    message: "NOPE",
    loggedIn: false,
    user: req.user,
  });
};

authRouter.get("/register", getRegister);
authRouter.post("/register", postRegister);
authRouter.post("/login", postLogin);

export default authRouter;
