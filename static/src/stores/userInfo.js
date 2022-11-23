import { defineStore } from "pinia";

export const useUserInfoStore = defineStore("userInfo", {
  state: () => ({ userName: "", userNick: "", loggedIn: false }),
  actions: {
    setInfo(name, nick, isLoggedIn) {
      this.userName = name;
      this.userNick = nick;
      this.loggedIn = isLoggedIn;
    },
  },
  getters: {
    getInfo(state) {
      return [state.userName, state.userNick, state.loggedIn];
    },
  },
  persist: true,
});
