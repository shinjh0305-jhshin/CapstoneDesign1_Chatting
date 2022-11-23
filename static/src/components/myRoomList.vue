<template>
  <div class="room-left-container">
    <div class="room-header">Rooms</div>
    <div class="room-box">
      <div
        class="room"
        v-for="myRoom in myRoomList"
        :class="{
          picked: String(myRoom.roomId) === String($route.params.roomId),
        }"
      >
        <router-link :to="{ name: 'room', params: { roomId: myRoom.roomId } }"
          ><div class="room-name">
            <span>{{ myRoom.roomName }}</span>
          </div></router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { useUserInfoStore } from "../stores/userInfo";
import axios from "axios";
import useAxios from "../modules/axios";
const { axiosGet, axiosPost } = useAxios();
export default {
  name: "myRoomList",
  //props: ["myRoomList"],
  data() {
    return {
      myRoomList: [],
      pickedRoomObj: {},
    };
  },
  beforeMount() {
    const getMyRoomSuccess = (respData) => {
      console.log("✅ Get My Rooms - Success");
      console.log(respData);
      this.myRoomList = respData.rooms;
    };
    const getMyRoomFail = (respData) => {
      console.log("❌ Get My Rooms - Fail");
    };
    const store = useUserInfoStore();
    const nickname = store.userNick;
    this.currentUser = store.userNick;
    console.log("✅ Before Mount: Get Room!!");
    axiosGet(`/users/${nickname}/room`, getMyRoomSuccess, getMyRoomFail);
  },
  mounted() {
    console.log("⭐️ CHANGE ROOM...", this.$route.params.roomId);
    for (const roomObj of this.myRoomList) {
      if (Number(roomObj.roomId) === Number(id)) {
        this.pickedRoomObj = roomObj;
        break;
      }
    }
  },
};
</script>

<style scoped>
div.room-left-container {
  height: 100%;
  position: relative;
  background-color: #353333;
}
div.room-header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 1rem;
  border-bottom: 3px solid black;
  font-size: 0.9rem;
  margin-bottom: 2rem;
}
div.room-box {
  -ms-overflow-style: none;
  scrollbar-width: none;
  overflow: scroll;
  max-height: 100%;
  padding: 2rem 0rem;
}
div.room-box::-webkit-scrollbar {
  display: none;
}
div.room {
  height: 60px;
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
div.room :hover {
  color: white;
}
div.room.picked {
  background-color: rgb(42, 40, 40);
  color: #7e71bb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  border-radius: 10px;
}
div.room-name {
  width: 90%;
  display: flex;
  justify-content: center;
}
a {
  text-decoration: none;
  color: var(--button-text);
  width: 100%;
}
</style>
