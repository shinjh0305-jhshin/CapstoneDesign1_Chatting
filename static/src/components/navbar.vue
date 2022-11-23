<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid text-white">
      <a href="#" class="navbar-brand text-white">우리동네 공유마켓</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon navbar-dark"></span>
      </button>
      <div
        class="collapse navbar-collapse"
        id="navbarNav"
        v-if="userStore.loggedIn === false"
      >
        <!-- 로그인하지 않은 경우 초기 menu -->
        <ul
          :class="{ 'navbar-nav': true, 'me-auto': menu.me_auto }"
          v-for="menu in menu_category"
          :key="menu.id"
        >
          <li
            class="nav-item"
            v-for="menu_object in menu.value"
            :key="menu_object.key"
          >
            <a
              :class="{
                'nav-link': true,
                active: menu == menu_object.key,
                'text-white': true,
              }"
              @click="onMovePage($event, menu_object)"
              :href="menu_object.URL"
              >{{ menu_object.value }}</a
            >
          </li>
        </ul>
      </div>
      <div class="collapse navbar-collapse" id="navbarNav" v-else>
        <!-- 로그인한 경우 menu -->
        <ul
          :class="{ 'navbar-nav': true, 'me-auto': menu.me_auto }"
          v-for="menu in loggedInMenus_category"
          :key="menu.id"
        >
          <li
            class="nav-item"
            v-for="menu_object in menu.value"
            :key="menu_object.key"
          >
            <a
              v-if="menu_object.key === 'nick'"
              :class="{
                'nav-link': true,
                active: menu == menu_object.key,
                'text-white': true,
              }"
              @click="onMovePage($event, menu_object)"
              :href="menu_object.URL"
              >{{ userStore.userNick }}
            </a>
            <a
              v-else-if="menu_object.key === 'logout'"
              :class="{
                'nav-link': true,
                active: menu == menu_object.key,
                'text-white': true,
              }"
              @click="onMovePage($event, menu_object)"
              :href="menu_object.URL"
              >{{ menu_object.value }}
            </a>
            <a
              v-else
              :class="{
                'nav-link': true,
                active: menu == menu_object.key,
                'text-white': true,
              }"
              @click="onMovePage($event, menu_object)"
              :href="menu_object.URL"
              >{{ menu_object.value }}</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "navbar",
};
</script>

<script setup>
import { ref, computed } from "vue";
import { useUserInfoStore } from "/@stores/userInfo";

const userStore = useUserInfoStore();

const menu = ref("home");
const menus = [
  { key: "home", value: "홈", URL: "http://localhost:5173", position: "left" },
  {
    key: "chat",
    value: "채팅",
    URL: "http://localhost:5173/room",
    position: "left",
  },
  {
    key: "login",
    value: "로그인",
    URL: "http://localhost:5173/login",
    position: "right",
  },
];

const loggedInMenus = [
  { key: "home", value: "홈", URL: "http://localhost:5173", position: "left" },
  {
    key: "chat",
    value: "전체 채팅",
    URL: "http://localhost:5173/allRoom",
    position: "left",
  },
  {
    key: "mychat",
    value: "공구 채팅",
    URL: `http://localhost:5173/room/0`,
    position: "left",
  },
  { key: "nick", URL: "#", position: "right" },
  {
    key: "logout",
    value: "로그아웃",
    URL: "http://localhost:5173/login",
    position: "right",
  },
];

const left_menus = computed(() => menus.filter((i) => i.position == "left"));
const right_menus = computed(() => menus.filter((i) => i.position == "right"));
const left_loggedInMenus = computed(() =>
  loggedInMenus.filter((i) => i.position == "left")
);
const right_loggedInMenus = computed(() =>
  loggedInMenus.filter((i) => i.position == "right")
);

const onMovePage = (evt, menu_object) => {
  if (menu_object.key === "logout") {
    userStore.setInfo("", "", false);
  }
  console.log(menu_object);
  if (evt) {
    //evt.preventDefault();
  }
  menu.value = menu_object.key;
};

const loggedInMenus_category = [
  { id: 1, me_auto: true, value: left_loggedInMenus.value },
  { id: 2, me_auto: false, value: right_loggedInMenus.value },
];

const menu_category = [
  { id: 1, me_auto: true, value: left_menus.value },
  { id: 2, me_auto: false, value: right_menus.value },
];
</script>

<style>
nav {
  background-color: #0b2239;
  color: white;
}
</style>
