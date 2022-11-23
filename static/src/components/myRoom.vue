<template>
  <section class="room-page">
    <section class="left" :class="{ showSectionLeft: show }">
      <div class="room-container">
        <div class="room-header">Just Header</div>
        <div class="room-box">
          <div
            class="room"
            v-for="myRoom in myRoomList"
            :class="{ picked: $route.params.roomId === myRoom.roomId }"
          >
            <router-link
              :to="{ name: 'room', params: { roomId: myRoom.roomId } }"
              ><div class="room-name">
                <p>{{ myRoom.roomName }}</p>
              </div></router-link
            >
          </div>
        </div>
      </div>
    </section>
    <section class="right"></section>
  </section>
</template>

<script>
import useAxios from "../modules/axios";
import { useUserInfoStore } from "../stores/userInfo";
export default {
  name: "roomList",
  data() {
    return {
      myRoomList: [],
      userNick: "",
    };
  },
  beforeCreate() {
    const store = useUserInfoStore();
    this.userNick = store.userNick;
  },
  beforeMount() {
    const { axiosGet, axiosPost } = useAxios();
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
    axiosGet(`/users/${nickname}/room`, getMyRoomSuccess, getMyRoomFail);
  },
};
</script>

<style scoped>
section.room-page {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  height: 100vh;
  overflow: hidden;
  background-color: antiquewhite;
}
section.left {
  width: 25%;
  height: 100%;
  transition: all ease 0.5s;
  position: relative;
  z-index: 50;
}
section.right {
  width: 75%;
  height: 100%;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin-left: auto;
}
div.room-container {
  height: 100%;
  position: relative;
  background-color: #262528;
}
div.room-header,
div.room,
div.room-name {
  display: flex;
  align-items: center;
}
div.room-header {
  justify-content: space-between;
  padding: 0.8rem 1rem;
  border-bottom: 3px solid;
  font-size: 0.9rem;
  margin-bottom: 2rem;
}
div.room {
  width: 90%;
  margin: auto;
  justify-content: space-between;
  position: relative;
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

div.room-name {
  width: 90%;
}
a {
  text-decoration: none;
  color: var(--button-text);
  width: 100%;
}
</style>
