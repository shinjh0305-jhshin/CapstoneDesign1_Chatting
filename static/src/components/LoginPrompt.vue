<template lang="pug">
div(class="container p-5")
  div(class="mb-4 bg-light rounded-3" id="login-box")
    h1(class="mb-5") Login
    form
      div(class="mb-2 row")
        div(class="col-sm-8 w-100")
          input(type="text" class="form-control" v-model="userInfo.username" id="userID" placeholder="ID" required)
      div(class="mb-2 row")
        div(class="col-sm-8 w-100")
          input(type="password" class="form-control" v-model="userInfo.password" id="userPWD" placeholder="Password" required)
      button(class="btn btn-danger w-100" @click="loginSubmit()") Login 
      <br/> <br/>
      p(id="noAccount") If you don't have an account....
      button(class="btn btn-primary w-100" onclick="login") Create account
</template>

<script>
export default {
  name: "LoginPrompt",
  computed: {
    console: () => console,
    window: () => window,
  },
};
</script>

<script setup>
import useAxios from "../modules/axios";
import { useUserInfoStore } from "/@stores/userinfo";
import { reactive } from "vue";

const { axiosGet, axiosPost } = useAxios();

const userInfo = reactive({
  username: "",
  password: "",
});

const onLoginSuccess = (respData) => {
  console.log("Success - set LocalStorage");
  localStorage.setItem("userID", respData.userInfo.username);
  localStorage.setItem("NICK", respData.userInfo.password);
};

const loginSubmit = () => {
  console.log("hi");
  console.log(`userId : ${userInfo.username} userPWD : ${userInfo.password}`);
  axiosPost("http://localhost:8080/users/login", userInfo, onLoginSuccess);
};
</script>

<style>
#login-box {
  padding: 5% 30% 5% 30%;
}
</style>
