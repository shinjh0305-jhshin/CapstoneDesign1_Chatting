<template>
  <div class="container p-5">
    <div class="mb-4 bg-light rounded-3" id="login-box">
      <h1 class="mb-5">Login</h1>
      <form>
        <div class="mb-2 row">
          <label for="userID" class="col-sm-4 col-form-label">ID</label>
          <div class="col-sm-8">
            <input
              type="text"
              class="form-control"
              v-model="userInfo.userID"
              id="userID"
              placeholder="ID"
              required
            />
            <br />
          </div>
        </div>

        <div class="mb-2 row">
          <label for="userPWD" class="col-sm-4 col-form-label">Password</label>
          <div class="col-sm-8">
            <input
              type="password"
              class="form-control"
              v-model="userInfo.userPWD"
              id="userPWD"
              placeholder="Password"
              required
            />
            <br />
          </div>
        </div>
        <button type="button" class="btn btn-danger w-100" @click="loginSubmit">
          Login
        </button>
      </form>
      <p id="noAccount">If you don't have an account....</p>
      <button type="button" class="btn btn-primary w-100" @click="goToJoin">
        Create account
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPrompt",
  /*
  setup() {
    const user = useUserInfoStore();
    return {
      user,
    };
  },
  */
};
</script>

<script setup>
import useAxios from "../modules/axios";
import { useUserInfoStore } from "/@stores/userInfo";
import { reactive } from "vue";
import router from "../routers";

const { axiosGet, axiosPost } = useAxios();

const userInfo = reactive({
  userID: "",
  userPWD: "",
});

const goToJoin = () => {
  router.push("join");
};

const onLoginSuccess = (respData) => {
  const userStore = useUserInfoStore();
  userStore.setInfo(respData.data.userID, respData.data.userNick, true);
  console.log("✅ userStore", userStore.getInfo);
  if (userStore.loggedIn) {
    router.push({ name: "landingPage" });
  }
};

const onLoginFail = (respData = null) => {
  console.log("❌ FAILED");
};

const loginSubmit = () => {
  axiosPost("/users/login", userInfo, onLoginSuccess, onLoginFail);
};
</script>

<style>
#login-box {
  padding: 5% 30% 5% 30%;
}
</style>
