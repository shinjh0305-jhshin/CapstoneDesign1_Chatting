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
      <div class="collapse navbar-collapse" id="navbarNav">
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
              href="#"
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

const menu = ref("home");
const menus = [
  { key: "home", value: "홈", URL: "#", position: "left" },
  { key: "chat", value: "채팅", URL: "#", position: "left" },
  { key: "login", value: "로그인", URL: "#", position: "right" },
];

const left_menus = computed(() => menus.filter((i) => i.position == "left"));
const right_menus = computed(() => menus.filter((i) => i.position == "right"));

const onMovePage = (evt, menu_object) => {
  if (evt) {
    evt.preventDefault();
  }
  menu.value = menu_object.key;
};

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
