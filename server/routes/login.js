const { client } = require("../tools/jwt");
//import client from '../tools/client';
const { redisCli, get, set } = require("../tools/cache");
const db = require("../tools/authdb");

const login = async (req, res) => {
  const { username, password } = req.body;
  const [result] = await db.query(
    `SELECT * FROM user WHERE ID = '${username}'`
  );
  console.log(result);
  const user = result[0];

  if (user) {
    const chk = password === user.PWD;
    if (chk) {
      const accessToken = client.sign(user);
      const refreshToken = client.refresh();
      console.log(`refreshToken : ${refreshToken}`);
      await set(username, refreshToken);

      return res.status(200).send({
        ok: true,
        data: {
          accessToken,
          refreshToken,
        },
      });
    } else {
      return res.status(401).send({
        ok: false,
        message: "password is incorrect",
      });
    }
  } else {
    return res.status(401).send({
      ok: false,
      message: "user not exist",
    });
  }
};

module.exports = { login };
