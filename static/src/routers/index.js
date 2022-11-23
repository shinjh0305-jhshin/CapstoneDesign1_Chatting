import { createRouter, createWebHistory } from "vue-router";
import landingPage from "../components/landingPage.vue";
import login from "../components/loginPrompt.vue";
import product from "../components/product.vue";
import join from "../components/join.vue";
import allRoom from "../components/allRoom.vue";
import myRoom from "../components/myRoom.vue";
import room from "../components/room.vue";
import { useUserInfoStore } from "/@stores/userInfo";
import axios from "axios";

const routes = [
  {
    path: "/",
    name: "landingPage",
    component: landingPage,
    meta: { authRequired: true },
  },
  {
    path: "/login",
    name: "login",
    component: login,
    meta: { authRequired: false },
  },
  {
    path: "/join",
    name: "join",
    component: join,
    meta: { authRequired: false },
  },
  {
    path: "/product",
    name: "product",
    component: product,
    meta: { authRequired: true },
  },
  {
    path: "/allRoom",
    name: "allRoom",
    component: allRoom,
    meta: { authRequired: true },
  },
  {
    path: "/:userNick/room",
    name: "roomList",
    component: myRoom,
    meta: { authRequired: true },
  },
  {
    path: "/room/:roomId",
    name: "room",
    component: room,
    meta: { authRequired: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const checkValidRoomMember = async (currentUser, curRoomId) => {
  console.log(currentUser, curRoomId);
  const result = await axios.get(
    `http://localhost:8080/rooms/${curRoomId}/nickname/${currentUser}`
  );
  console.log(result.data, result.status);
  if (result.data.ok === true) {
    console.log("IS MEMBER!!");
    return true;
  } else {
    return false;
  }
};

router.beforeEach(async (to, from, next) => {
  // console.log("to =>", to);
  // console.log("from =>", from);

  const store = useUserInfoStore();
  const isLoggedIn = store.loggedIn;
  const currentUser = store.userNick;

  const curRoomId = to.params.roomId;

  if (isLoggedIn && currentUser) {
    if (curRoomId > 0) {
      if ((await checkValidRoomMember(currentUser, curRoomId)) === true) {
        next();
      } else {
        alert("방의 멤버가 아닙니다.");
        next({ name: "landingPage" });
      }
    } else {
      next();
    }
  } else if (isLoggedIn && to.meta.authRequired === false) {
    console.log("❗️ NOT allowed");
    next({ name: "landingPage" });
  } else if (isLoggedIn === false && to.meta.authRequired) {
    console.log("❗️ NOT allowed");
    next("login");
  } else {
    next();
  }
});

export default router;
