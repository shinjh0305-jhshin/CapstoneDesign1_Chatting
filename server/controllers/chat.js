const db = require("../tools/authdb");
// db is a pool

export const createRoom = async (req, res) => {
  const { roomName } = req.body;
  const { nickname } = req.params;
  console.log("✅ Got RoomName: ", roomName);
  console.log("✅ Got NickName: ", nickname);

  if (roomName === undefined || nickname === undefined) {
    return res.status(401).json({
      ok: false,
    });
  }
  try {
    const result = await db.query(
      `INSERT INTO Room(nickname, roomName) VALUES('${nickname}','${roomName}');`
    );
    //console.log(result);
    const newId = result[0].insertId;
    await db.query(
      `INSERT INTO Member(roomId,nickname) VALUES('${newId}','${nickname}');`
    );
    return res.status(200).json({
      ok: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      ok: false,
    });
  }
};

export const getAllRooms = async (req, res) => {
  try {
    const rooms = await db.query(`SELECT roomId, roomname from Room;`);
    return res.status(200).json({ ok: true, rooms: rooms[0] });
  } catch (err) {
    console.log("❌ Failed to fetch Rooms from DB.");
    return res.status(401).json({});
  }
};

export const getAttachedRooms = async (req, res) => {
  const { nickname } = req.params;
  if (nickname === undefined) {
    return res.status(401).json({ rooms: [] });
  }
  try {
    const myRooms = await db.query(
      `SELECT A.roomId, A.roomName FROM Room as A JOIN Member as B WHERE B.nickname = '${nickname}' and A.roomId = B.roomId GROUP By A.roomId`
    );
    return res.status(200).json({ ok: true, rooms: myRooms[0] });
  } catch (err) {
    return res.status(401).json({ ok: false, rooms: [] });
  }
};

export const enterRoom = async (req, res) => {
  //console.log(req.body);
  const { roomId, nickname } = req.body;
  console.log("roomId", roomId);
  console.log("nickname", nickname);
  if (roomId === undefined || nickname === undefined) {
    console.log("❌ Undefined");
    return res.status(401).json({ ok: false, errorMessage: "Failed..." });
  }
  try {
    const [result] = await db.query(
      `SELECT COUNT(*) as CNT FROM MEMBER WHERE roomId = ${roomId} and nickname = '${nickname}';`
    );
    const memCnt = result[0]["CNT"];
    //console.log("memCnt:", memCnt);
    if (memCnt) {
      return res.status(200).json({ ok: false });
    }
    await db.query(
      `INSERT INTO Member(roomId,nickname) VALUES('${roomId}','${nickname}');`
    );
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.log("❌ Error", err);
    return res.status(401).json({ ok: false });
  }
};

export const checkUserInRoom = async (req, res) => {
  const { roomId, nickname } = req.params;
  //console.log(roomId, nickname);
  try {
    const [result] = await db.query(
      `SELECT COUNT(*) as CNT FROM MEMBER WHERE roomId = ${roomId} and nickname = '${nickname}';`
    );
    const memCnt = result[0]["CNT"];
    //console.log("memcnt:", memCnt);
    if (memCnt > 0) {
      return res.status(200).json({
        ok: true,
      });
    } else {
      return res.status(200).json({
        ok: false,
      });
    }
  } catch (err) {
    return res.status(200).json({
      ok: false,
    });
  }
};

export const getChat = async (req, res) => {
  console.log("GET CHAT:", req.params);
  const { roomId } = req.params;
  if (roomId === undefined) {
    return res.status(401).json({ ok: false });
  }
  try {
    const [result] = await db.query(
      `SELECT nickname, content, createdAt, roomId FROM CHAT WHERE roomId = '${roomId}';`
    );
    //console.log(result);
    return res.status(200).json({ ok: true, msgList: result });
  } catch (err) {
    return res.status(401).json({ ok: false, msgList: [] });
  }
};

export const postChat = async (req, res) => {
  //console.log(req.body);
  const { content, sender, imgPath, roomId } = req.body;
  const replacedContent = content.replace(/'/g, "''");
  try {
    await db.query(
      `INSERT INTO CHAT(roomId,nickname,content) VALUES('${roomId}','${sender}','${replacedContent}');`
    );
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ ok: false });
  }
};
