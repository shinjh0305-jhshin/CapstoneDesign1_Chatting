const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const redis = require("redis");
const router = require("express").Router();
const db = require("../tools/authdb");

const jwtSecret = process.env.JWT_SECRET;

router.post("/login_process", async (req, res) => {
  const user_id = req.body.userID;
  const user_password = req.body.userPWD;

  const [result] = await db.query(`SELECT * FROM user WHERE ID = '${user_id}'`);
  const userData = result[0];

  let msg;
  let status = 0;

  if (userData === undefined) {
    status = 1;
    msg = "Wrong User ID";
  } else if (userData.PWD !== user_password) {
    status = 2;
    msg = "Check Password again";
  } else {
    msg = `Welcome ${userData.NICK}`;
  }

  const userInfo = status == 0 ? { ID: userData.ID, NICK: userData.NICK } : {};

  res.status(200).json({ status, userInfo, msg });
});

module.exports = router;
