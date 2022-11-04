const express = require("express");
const { login } = require("./login");
const { refresh } = require("./refresh");
const { authJWT } = require("./auth");

const router = express.Router();

router.post("/login", login);
router.post("/refresh", refresh);
router.get("/test", authJWT);

module.exports = router;
